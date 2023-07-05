package DAO;

import model.ModelVendas;
import model.ModelVendasProdutos;
import model.ModelEstoque;
import conexoes.ConexaoMySql;
import java.sql.Date;
import java.util.List;



import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


/**
 *
 * @author andre
 */
public class DAOVendasProdutos extends ConexaoMySql {

    /**
     * grava VendasProdutos
     *
     * @param pModelVendasProdutos
     * @return int
     */
    public int salvarVendasProdutosDAO(ModelVendasProdutos pModelVendasProdutos) {
        try {
            this.conectar();
            return this.insertSQL(
                    "INSERT INTO tbl_vendas_produtos ("
                    + "fk_produto,"
                    + "fk_vendas,"
                    + "valor_venda_uni,"
                    + "quantidade"
                    + "data_available"
                    + ") VALUES ("
                    + "'" + pModelVendasProdutos.getProduto() + "',"
                    + "'" + pModelVendasProdutos.getVendas() + "',"
                    + "'" + pModelVendasProdutos.getValor() + "',"
                    + "'" + pModelVendasProdutos.getQuantidade() + "',"
                    + "1"
                    + ");"
            );
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        } finally {
            this.fecharConexao();
        }
    }

    /**
     * exclui VendasProdutos
     *
     * @param pIdVendaProduto
     * @return boolean
     */
    public boolean excluirVendasProdutosDAO(int pIdVendaProduto) {
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                    "DELETE FROM tbl_vendas_produtos "
                    + " WHERE "
                    + "fk_vendas = '" + pIdVendaProduto + "'"
                    + ";"
            );
        } catch (Exception e) { 
            e.printStackTrace();
            return false;
        } finally {
            this.fecharConexao();
        }
    }

    /**
     * Salvar uma lita de produtos da venda
     *
     * @param pListaModelVendasProdutos
     * @return
     */
    public boolean salvarVendasProdutosDAO(ArrayList<ModelVendasProdutos> pListaModelVendasProdutos) {
        try {
            for (ModelVendasProdutos produto : pListaModelVendasProdutos) {
                realizaVenda(produto);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } 
    }




    
    public void realizaVenda(ModelVendasProdutos produto ) {
        System.out.print(produto);
        int quantidade, id_produto = 0;
        quantidade = produto.getQuantidade();
        id_produto = produto.getProduto();
        try {
            // Obtém a quantidade atual do produto
            int quantidadeTotal = getQuantidadeAtual(id_produto);
            if (quantidadeTotal >= produto.getQuantidade()) {
                // Consulta as compras do produto
                List<ModelEstoque> compras = getConsultacompras(id_produto);
                for (ModelEstoque estoque : compras) {
                    int quantidadeAtualCompra = estoque.getQuantidadeAtual();
                    int idEstoque = estoque.getIdEstoque();
                    if (quantidadeAtualCompra >= quantidade && quantidade > 0 ) {
                        // Decrementa a quantidade total d=no estoque
                        decrementaQuantidade(quantidade, idEstoque);
                        quantidade = 0;
                        if (quantidade <= 0) {
                            salvarVendasProdutoDAO(produto);
                            
                        }
                    } else if (quantidadeAtualCompra > 0 && quantidade > 0) {
                        // Decrementa parcialmente a quantidade no estoque
                        decrementaQuantidade(quantidadeAtualCompra, idEstoque);
                        quantidade = quantidade - quantidadeAtualCompra;
                    } else {
                    }
                }
            }
        } 
        catch (SQLException e) {
            e.printStackTrace();
        } finally {
            fecharConexao(); // Fecha a conexão com o banco de dados
        }
    }
    private int getQuantidadeAtual(int produto) throws SQLException {
    int quantidadeTotal = 0;
    try {
        this.conectar();
        String sql = "SELECT SUM(e.quantidade_atual) AS quantidade_total " +
                "FROM tbl_produto p " +
                "INNER JOIN tbl_estoque e ON p.ID_produto = e.FK_produto " +
                "WHERE p.data_available = 1 AND p.ID_produto = ?";
        PreparedStatement stmt = getCon().prepareStatement(sql);
        stmt.setInt(1, produto);
        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            quantidadeTotal = rs.getInt("quantidade_total");
        }
        rs.close();
        stmt.close();
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        this.fecharConexao();
    }
    return quantidadeTotal;
}

    
    private List<ModelEstoque> getConsultacompras(int produto) throws SQLException {
        List<ModelEstoque> listaEstoque = new ArrayList<>();
        try {
        this.conectar();    
            String sql = "SELECT * FROM tbl_estoque WHERE FK_produto = ? AND quantidade_atual > 0";
            PreparedStatement stmt = getCon().prepareStatement(sql);
            stmt.setInt(1, produto);
            ResultSet rs = stmt.executeQuery();


            while (rs.next()) {
            int idEstoque = rs.getInt("ID_estoque");
            int fkProduto = rs.getInt("FK_produto");
            int fkCompra = rs.getInt("FK_compra");
            int quantidadeInicial = rs.getInt("quantidade_inicial");
            int quantidadeAtual = rs.getInt("quantidade_atual");
            double valorUniCompra = rs.getDouble("valor_uni_compra");
            Date dataValidadeLote = rs.getDate("data_validade_lote");
            boolean dataAvailable = rs.getBoolean("data_available");

            ModelEstoque estoque = new ModelEstoque(idEstoque, fkProduto, fkCompra, quantidadeInicial,
                    quantidadeAtual, valorUniCompra, dataValidadeLote, dataAvailable);

            listaEstoque.add(estoque);
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
            return null;
        } finally {
            this.fecharConexao();
        }
    return listaEstoque;
    }

    

    private void decrementaQuantidade(int quantidade, int idEstoque) throws SQLException {
        this.conectar();
        String sql = "UPDATE tbl_estoque SET quantidade_atual = quantidade_atual - ? WHERE ID_estoque = ?";
        try (PreparedStatement stmt = getCon().prepareStatement(sql)) {
            stmt.setInt(1, quantidade);
            stmt.setInt(2, idEstoque);
            stmt.executeUpdate();
        }
    }

    public void salvarVendasProdutoDAO(ModelVendasProdutos pModelVendasProdutos){
        int id = 0;
        try {
            this.conectar();
            int rowsAffected = this.insertSQL(
                "INSERT INTO tbl_venda_produto("
                    + "FK_venda,"
                    + "FK_estoque,"
                    + "quantidade,"
                    + "valor_venda_uni,"
                    + "data_available"
                + ") VALUES ("
                    + "" + pModelVendasProdutos.getVendas() + ","
                    + "" + pModelVendasProdutos.getProduto() + ","
                    + "" + pModelVendasProdutos.getQuantidade() + ","
                    + "" + pModelVendasProdutos.getValor() + ","
                    + "1 );"
            );
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
    }
    



    public int salvarVendasDAO(ModelVendas pModelVendas){
        try {
            this.conectar();
            return this.insertSQL(
                "INSERT INTO tbl_venda("
                    + "FK_pessoa,"
                    + "FK_funcionario,"
                    + "FK_forma_pagamento,"
                    + "data_venda,"
                    + "valor_liquido,"
                    + "valor_bruto,"
                    + "desconto,"
                    + "descricao, "
                    + "data_available "
                + ") VALUES ("
                    + "" + pModelVendas.getFk_pessoa() + ","
                    + "1,"
                    + "1,"
                    + "'" + pModelVendas.getDataVenda() + "',"
                    + "" + pModelVendas.getVenValorLiquido() + ","
                    + "" + pModelVendas.getVenValorBruto() + ","
                    + "" + pModelVendas.getVenDesconto()+ ","
                    + "'caixa',"
                    + "1 );"
            );
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }finally{
            this.fecharConexao();
        }
    }

}



