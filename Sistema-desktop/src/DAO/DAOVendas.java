package DAO;

import model.ModelVendas;
import conexoes.ConexaoMySql;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author andre
 */

public class DAOVendas extends ConexaoMySql {

    public void realizaVenda(int quantidade, int produto) {
        try {
            // Obtém a quantidade atual do produto
            int quantidadeTotal = getQuantidadeAtual(produto);
            if (quantidadeTotal >= quantidade) {
                // Consulta as compras do produto
                ResultSet compras = getConsultacompras(produto);
                while (compras.next()) {
                    int quantidadeAtualCompra = compras.getInt("quantidade_atual");
                    int idEstoque = compras.getInt("ID_estoque");
                    if (quantidadeAtualCompra >= quantidade) {
                        // Decrementa a quantidade do estoque
                        decrementaQuantidade(quantidade, idEstoque);
                        quantidade = quantidadeAtualCompra - quantidade;
                        if (quantidade <= 0) {
                            return;
                        }
                    } else if (quantidadeAtualCompra > 0) {
                        // Decrementa parcialmente a quantidade do estoque
                        decrementaQuantidade(quantidadeAtualCompra, idEstoque);
                        quantidade -= quantidadeAtualCompra;
                    } else {
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            fecharConexao(); // Fecha a conexão com o banco de dados
        }
    }

   private int getQuantidadeAtual(int produto) throws SQLException {
    try {
        this.conectar();
        String sql = "SELECT SUM(e.quantidade_atual) AS quantidade_total " +
                "FROM tbl_produto p " +
                "INNER JOIN tbl_estoque e ON p.ID_produto = e.FK_produto " +
                "WHERE p.data_available = 1 AND p.ID_produto = ? " +
                "GROUP BY p.ID_produto, p.nome";
        PreparedStatement stmt = getCon().prepareStatement(sql);
        stmt.setInt(1, produto);
        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            return rs.getInt("quantidade_total");
        }
        rs.close();
        stmt.close();
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        this.fecharConexao();
    }
    return 0;
}






    private ResultSet getConsultacompras(int produto) throws SQLException {
        String sql = "SELECT * FROM tbl_estoque WHERE FK_produto = ?";
        try (PreparedStatement stmt = getCon().prepareStatement(sql)) {
            stmt.setInt(1, produto);
            return stmt.executeQuery();
        }
    }
    private void decrementaQuantidade(int quantidade, int idEstoque) throws SQLException {
        String sql = "UPDATE tbl_estoque SET quantidade_atual = quantidade_atual - ? WHERE ID_estoque = ?";
        try (PreparedStatement stmt = getCon().prepareStatement(sql)) {
            stmt.setInt(1, quantidade);
            stmt.setInt(2, idEstoque);
            stmt.executeUpdate();
        }
    }

public int salvarVendasDAO(ModelVendas pModelVendas){
    System.out.println(pModelVendas);
        try {
            this.conectar();
            if(pModelVendas.getFk_pessoa() == 0){
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
                    + "null,"
                    + "1,"
                    + "" + pModelVendas.getFK_forma_pagamento()+","
                    + "'"+ pModelVendas.getDataVenda() + "',"
                    + "" + pModelVendas.getVenValorLiquido() + ","
                    + "" + pModelVendas.getVenValorBruto() + ","
                    + "" + pModelVendas.getVenDesconto()+ ","
                    + "'caixa',"
                    + "1 );"
                );
            }
            else{
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
                    + "" + pModelVendas.getFK_forma_pagamento()+","
                    + "'"+ pModelVendas.getDataVenda() + "',"
                    + "" + pModelVendas.getVenValorLiquido() + ","
                    + "" + pModelVendas.getVenValorBruto() + ","
                    + "" + pModelVendas.getVenDesconto()+ ","
                    + "'caixa',"
                    + "1 );"
                );
            }
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }finally{
            this.fecharConexao();
        }
    }





    /**
     * recupera Vendas
     * 
     * @param pIdVenda
     * @return ModelVendas
     */
    public ModelVendas getVendasDAO(int pIdVenda) {
        ModelVendas modelVendas = new ModelVendas();
        try {
            this.conectar();
            this.executarSQL(
                    "SELECT "
                            + "pk_id_vendas,"
                            + "fk_cliente,"
                            + "ven_data_venda,"
                            + "ven_valor_liquido,"
                            + "ven_valor_bruto,"
                            + "ven_desconto"
                            + " FROM"
                            + " tbl_vendas"
                            + " WHERE"
                            + " pk_id_venda = '" + pIdVenda + "'"
                            + ";");

            while (this.getResultSet().next()) {
                modelVendas.setIdVenda(this.getResultSet().getInt(1));
                modelVendas.setFk_pessoa(this.getResultSet().getInt(2));
                modelVendas.setDataVenda(this.getResultSet().getDate(3));
                modelVendas.setVenValorLiquido(this.getResultSet().getDouble(4));
                modelVendas.setVenValorBruto(this.getResultSet().getDouble(5));
                modelVendas.setVenDesconto(this.getResultSet().getDouble(6));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.fecharConexao();
        }
        return modelVendas;
    }

    /**
     * recupera uma lista de Vendas
     * 
     * @return ArrayList
     */
        public ArrayList<ModelVendas> getListaVendasDAO() {
            ArrayList<ModelVendas> listamodelVendas = new ArrayList();
            ModelVendas modelVendas = new ModelVendas();
            try {
                this.conectar();
                this.executarSQL(
                        "SELECT "
                                + "pk_id_vendas,"
                                + "fk_cliente,"
                                + "ven_data_venda,"
                                + "ven_valor_liquido,"
                                + "ven_valor_bruto,"
                                + "ven_desconto"
                                + " FROM"
                                + " tbl_vendas"
                                + ";");

                while (this.getResultSet().next()) {
                    modelVendas = new ModelVendas();
                    modelVendas.setIdVenda(this.getResultSet().getInt(1));
                    modelVendas.setFk_pessoa(this.getResultSet().getInt(2));
                    modelVendas.setDataVenda(this.getResultSet().getDate(3));
                    modelVendas.setVenValorLiquido(this.getResultSet().getDouble(4));
                    modelVendas.setVenValorBruto(this.getResultSet().getDouble(5));
                    modelVendas.setVenDesconto(this.getResultSet().getDouble(6));
                    listamodelVendas.add(modelVendas);
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                this.fecharConexao();
            }
            return listamodelVendas;
        }

    /**
     * atualiza Vendas
     * 
     * @param pModelVendas
     * @return boolean
     */
    public boolean atualizarVendasDAO(ModelVendas pModelVendas) {
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                    "UPDATE tbl_vendas SET "
                            + "pk_id_vendas = '" + pModelVendas.getIdVenda() + "',"
                            + "fk_cliente = '" + pModelVendas.getFk_pessoa() + "',"
                            + "ven_data_venda = '" + pModelVendas.getDataVenda() + "',"
                            + "ven_valor_liquido = '" + pModelVendas.getVenValorLiquido() + "',"
                            + "ven_valor_bruto = '" + pModelVendas.getVenValorBruto() + "',"
                            + "ven_desconto = '" + pModelVendas.getVenDesconto() + "'"
                            + " WHERE "
                            + "pk_id_vendas = '" + pModelVendas.getIdVenda() + "'"
                            + ";");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            this.fecharConexao();
        }
    }

    /**
     * exclui Vendas
     * 
     * @param pIdVenda
     * @return boolean
     */
    public boolean excluirVendasDAO(int pIdVenda) {
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                    "DELETE FROM tbl_vendas "
                            + " WHERE "
                            + "pk_id_vendas = '" + pIdVenda + "'"
                            + ";");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            this.fecharConexao();
        }
    }
}