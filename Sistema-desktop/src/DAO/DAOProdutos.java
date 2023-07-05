package DAO;

import model.ModelProdutos;
import conexoes.ConexaoMySql;
import java.util.ArrayList;
/**
*
* @author brendon
*/
public class DAOProdutos extends ConexaoMySql {

    /**
    * grava Produto
    * @param pModelProduto
    * @return int
    */
    public int salvarProdutoDAO(ModelProdutos pModelProduto){
        try {
            this.conectar();
            //int id_marca = this.executarSQL( "SELECT ID_marca FROM tbl_marca WHERE nome_marca = '" +  pModelProduto.getNome_marca()+ "'");
            //int id_marca = getMarcaDAO(pModelProduto);;

           // int ID_categoria = this.executarSQL( "SELECT ID_categoria FROM tbl_categoria WHERE categoria = '" +  pModelProduto.getCategoria()+ "'");
           // int ID_categoria = get;

            return this.insertSQL(
                "INSERT INTO tbl_produto ("
                    + "ID_produto,"
                    + "nome,"
                    + "valor_uni,"
                    + "peso,"
                    + "descricao,"
                    + "FK_marca,"
                    + "FK_categoria,"
                    + "data_available,"
                    + "min_recomendado"
                + ") VALUES ("
                    + "'" + pModelProduto.getID_produto() + "',"
                    + "'" + pModelProduto.getNome() + "',"
                    + "'" + pModelProduto.getValor_uni() + "',"
                    + "'" + pModelProduto.getPeso() + "',"
                    + "'" + pModelProduto.getDescricao() + "',"
                    + "'" + pModelProduto.getID_marca() + "',"
                    + "'" + pModelProduto.getID_categoria() + "',"
                    + "1,"
                    + "'" + pModelProduto.getMInRecomendado()+ "'"
                + ");"
            );
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }finally{
            this.fecharConexao();
            return 1;
        }
    }

    /**
    * recupera Produto
    * @param pID_produto
    * @return ModelProduto
    */
    public ModelProdutos getProdutoDAO(Integer pID_produto){
        ModelProdutos modelProduto = new ModelProdutos();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "+
                "tbl_produto.ID_produto, tbl_produto.nome, tbl_produto.valor_uni, tbl_produto.peso, tbl_produto.descricao, tbl_produto.min_recomendado, "+
                "tbl_marca.ID_marca, tbl_marca.nome_marca, "+
                "tbl_categoria.ID_categoria, tbl_categoria.categoria, tbl_categoria.desc_categoria, "+
                "SUM(tbl_estoque.quantidade_atual) AS quantidade_total "+
                "FROM "+
                "tbl_produto "+
                "INNER JOIN tbl_marca ON tbl_produto.FK_marca = tbl_marca.ID_marca "+
                "INNER JOIN tbl_categoria ON tbl_produto.FK_categoria = tbl_categoria.ID_categoria "+
                "LEFT JOIN tbl_estoque ON tbl_produto.ID_produto = tbl_estoque.FK_produto "+
                "WHERE "+
                    "tbl_produto.ID_produto = " + pID_produto + " and tbl_produto.data_available = true ");

            while(this.getResultSet().next()){
                modelProduto.setID_produto(this.getResultSet().getInt(1));
                modelProduto.setNome(this.getResultSet().getString(2));
                modelProduto.setValor_uni(this.getResultSet().getDouble(3));
                modelProduto.setPeso(this.getResultSet().getDouble(4));
                modelProduto.setDescricao(this.getResultSet().getString(5));
                modelProduto.setMinRecomendado(this.getResultSet().getInt(6));
                modelProduto.setID_marca(this.getResultSet().getInt(7));
                modelProduto.setNome_marca(this.getResultSet().getString(8));
                modelProduto.setID_categoria(this.getResultSet().getInt(9));
                modelProduto.setCategoria(this.getResultSet().getString(10));
                modelProduto.setDesc_categoria(this.getResultSet().getString(11));
                modelProduto.setQuantidade_total(this.getResultSet().getInt(12));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelProduto;
    }
    

public ModelProdutos retornarProdutoDAO(int pIdProduto) {
        ModelProdutos modelProdutos = new ModelProdutos();
        try {
            this.conectar();
            this.executarSQL("SELECT "
                    + "ID_produto, "
                    + "nome, "
                    + "valor_uni, "
                    + "quantidade_total "
                    + " FROM tbl_produto WHERE ID_produto =  '" + pIdProduto + "';");
            while (this.getResultSet().next()) {
                modelProdutos.setID_produto(this.getResultSet().getInt(1));
                modelProdutos.setNome(this.getResultSet().getString(2));
                modelProdutos.setValor_uni(this.getResultSet().getDouble(3));
                modelProdutos.setQuantidade_total(this.getResultSet().getInt(4));
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.fecharConexao();
        }
        return modelProdutos;
    }

public ModelProdutos retornarProdutoDAO(String pNomeProduto) {
        ModelProdutos modelProdutos = new ModelProdutos();
        try {
            this.conectar();
            this.executarSQL(
                    "SELECT "+
                    "tbl_produto.ID_produto, tbl_produto.nome, tbl_produto.valor_uni, tbl_produto.peso,tbl_produto.min_recomendado, tbl_produto.descricao, "+
                    "tbl_marca.ID_marca, tbl_marca.nome_marca, "+
                    "tbl_categoria.ID_categoria, tbl_categoria.categoria, tbl_categoria.desc_categoria, "+
                    "SUM(tbl_estoque.quantidade_atual) AS quantidade_total "+
                    "FROM "+
                    "tbl_produto "+
                    "INNER JOIN tbl_marca ON tbl_produto.FK_marca = tbl_marca.ID_marca "+
                    "INNER JOIN tbl_categoria ON tbl_produto.FK_categoria = tbl_categoria.ID_categoria "+
                    "LEFT JOIN tbl_estoque ON tbl_produto.ID_produto = tbl_estoque.FK_produto "+
                    "WHERE "+
                    "tbl_produto.nome = '" + pNomeProduto + "' and tbl_produto.data_available = true ");
            while (this.getResultSet().next()) {
                modelProdutos.setID_produto(this.getResultSet().getInt(1));
                modelProdutos.setNome(this.getResultSet().getString(2));
                modelProdutos.setValor_uni(this.getResultSet().getDouble(3));
                modelProdutos.setQuantidade_total(this.getResultSet().getInt(4));
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.fecharConexao();
        }
        return modelProdutos;
    }


    /**
    * recupera Produto
    * @param pNome
    * @return ModelProduto
    */
    public ModelProdutos getNomeProdutoDAO(String pNome){
        ModelProdutos modelProduto = new ModelProdutos();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "+
                "tbl_produto.ID_produto, tbl_produto.nome, tbl_produto.valor_uni, tbl_produto.peso, tbl_produto.descricao, "+
                "tbl_marca.ID_marca, tbl_marca.nome_marca, "+
                "tbl_categoria.ID_categoria, tbl_categoria.categoria, tbl_categoria.desc_categoria, "+
                "SUM(tbl_estoque.quantidade_atual) AS quantidade_total "+
                "FROM "+
                "tbl_produto "+
                "INNER JOIN tbl_marca ON tbl_produto.FK_marca = tbl_marca.ID_marca "+
                "INNER JOIN tbl_categoria ON tbl_produto.FK_categoria = tbl_categoria.ID_categoria "+
                "LEFT JOIN tbl_estoque ON tbl_produto.ID_produto = tbl_estoque.FK_produto "+
                "WHERE tbl_produto.nome =  '" + pNome + "'");

            while(this.getResultSet().next()){
                modelProduto.setID_produto(this.getResultSet().getInt(1));
                modelProduto.setNome(this.getResultSet().getString(2));
                modelProduto.setValor_uni(this.getResultSet().getDouble(3));
                modelProduto.setPeso(this.getResultSet().getDouble(4));
                modelProduto.setDescricao(this.getResultSet().getString(5));
                modelProduto.setID_marca(this.getResultSet().getInt(6));
                modelProduto.setNome_marca(this.getResultSet().getString(7));
                modelProduto.setID_categoria(this.getResultSet().getInt(8));
                modelProduto.setCategoria(this.getResultSet().getString(9));
                modelProduto.setDesc_categoria(this.getResultSet().getString(10));
                modelProduto.setQuantidade_total(this.getResultSet().getInt(11));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelProduto;
    }

    /**
    * recupera uma lista de Produto
        * @return ArrayList
    */
    public ArrayList<ModelProdutos> getListaProdutoDAO(){
        ArrayList<ModelProdutos> listamodelProduto = new ArrayList();
        ModelProdutos modelProduto = new ModelProdutos();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "+
                "tbl_produto.ID_produto, "+
                "tbl_produto.nome, "+
                "tbl_produto.valor_uni, "+
                "tbl_produto.peso, "+
                "tbl_produto.descricao, "+
                "tbl_marca.ID_marca, "+
                "tbl_marca.nome_marca, "+
                "tbl_categoria.ID_categoria, "+
                "tbl_categoria.categoria, "+
                "tbl_categoria.desc_categoria, "+
                "SUM(tbl_estoque.quantidade_atual) AS quantidade_total "+
                "FROM "+
                "tbl_produto "+
                "INNER JOIN tbl_marca ON tbl_produto.FK_marca = tbl_marca.ID_marca "+
                "INNER JOIN tbl_categoria ON tbl_produto.FK_categoria = tbl_categoria.ID_categoria "+
                "LEFT JOIN tbl_estoque ON tbl_produto.ID_produto = tbl_estoque.FK_produto "+
                "WHERE tbl_produto.data_available = true " +
                "GROUP BY "+
                "tbl_produto.ID_produto, "+
                "tbl_produto.nome, "+
                "tbl_produto.valor_uni, "+
                "tbl_produto.peso, "+
                "tbl_produto.descricao, "+
                "tbl_marca.ID_marca, "+ 
                "tbl_marca.nome_marca, "+
                "tbl_categoria.ID_categoria, "+
                "tbl_categoria.categoria, "+
                "tbl_categoria.desc_categoria "+
                "ORDER BY "+
                "tbl_produto.ID_produto ASC;"
            );

            while(this.getResultSet().next()){
                modelProduto = new ModelProdutos();
                modelProduto.setID_produto(this.getResultSet().getInt(1));
                modelProduto.setNome(this.getResultSet().getString(2));
                modelProduto.setValor_uni(this.getResultSet().getDouble(3));
                modelProduto.setPeso(this.getResultSet().getDouble(4));
                modelProduto.setDescricao(this.getResultSet().getString(5));
                modelProduto.setID_marca(this.getResultSet().getInt(6));
                modelProduto.setNome_marca(this.getResultSet().getString(7));
                modelProduto.setID_categoria(this.getResultSet().getInt(8));
                modelProduto.setCategoria(this.getResultSet().getString(9));
                modelProduto.setDesc_categoria(this.getResultSet().getString(10));
                modelProduto.setQuantidade_total(this.getResultSet().getInt(11));
                listamodelProduto.add(modelProduto);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listamodelProduto;
    }

    /**
    * atualiza Produto
    * @param pModelProduto
    * @return boolean
    */
    public boolean atualizarProdutoDAO(ModelProdutos pModelProduto){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_produto SET "
                    + "nome = '" + pModelProduto.getNome() + "',"
                    + "valor_uni = '" + pModelProduto.getValor_uni() + "',"
                    + "min_recomendado = '" + pModelProduto.getMInRecomendado() + "',"
                    + "peso = '" + pModelProduto.getPeso() + "',"
                    + "descricao = '" + pModelProduto.getDescricao() + "',"
                    + "FK_marca = '" + pModelProduto.getID_marca() + "',"
                    + "FK_categoria = " + pModelProduto.getID_categoria()
                + " WHERE "
                    + "ID_produto = " + pModelProduto.getID_produto() 
                + ";"
            );
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }finally{
            this.fecharConexao();
        }
    }

    /**
    * exclui Produto
    * @param pID_produto
    * @return boolean
    */
    public boolean excluirProdutoDAO(Integer pID_produto){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_produto "+ 
                "SET "+
                "data_available = false "+
                "WHERE " +
                "tbl_produto.ID_produto = " + pID_produto +";"
            );
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }finally{
            this.fecharConexao();
        }
    }


    public boolean alterarEstoqueProdutosDAO(ArrayList<ModelProdutos> pListaModelProdutos) {
         try {
            this.conectar();
            for (int i = 0; i < pListaModelProdutos.size(); i++) {
                this.executarUpdateDeleteSQL(
                        "UPDATE tbl_produto SET "
                        + "quantidade = '" + pListaModelProdutos.get(i).getQuantidade_total() + "'"
                        + " WHERE ID_produto = '" + pListaModelProdutos.get(i).getID_produto() + "'"
                );
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            this.fecharConexao();
        }
    }
}