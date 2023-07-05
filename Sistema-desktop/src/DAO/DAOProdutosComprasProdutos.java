/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import conexoes.ConexaoMySql;
import java.util.ArrayList;
import model.ModelProdutos;
import model.ModelProdutosComprasProdutos;
import model.ModelComprasProdutos;

/**
 *
 * @author andre
 */
public class DAOProdutosComprasProdutos extends ConexaoMySql {

    public ArrayList<ModelProdutosComprasProdutos> getListaProdutosComprasProdutosDAO(int pCodigoCompra) {
        ArrayList<ModelProdutosComprasProdutos> listaModelProdutosComprasProdutos = new ArrayList<>();
        ModelProdutosComprasProdutos modelProdutosComprasProdutos = new ModelProdutosComprasProdutos();
        ModelProdutos modelProdutos = new ModelProdutos();
        ModelComprasProdutos modelComprasProdutos = new ModelComprasProdutos();
        try {
            this.conectar();
            this.executarSQL("SELECT "
                    + " tbl_produto.pk_id_produto,"
                    + " tbl_produto.pro_estoque,"
                    + " tbl_produto.pro_nome,"
                    + " tbl_produto.pro_valor,"
                    + " tbl_Compras_produtos.fk_produto,"
                    + " tbl_Compras_produtos.fk_Compras,"
                    + " tbl_Compras_produtos.pk_id_compra_produto,"
                    + " tbl_Compras_produtos.com_pro_quantidade,"
                    + " tbl_Compras_produtos.com_pro_valor "
                    + " FROM tbl_compras_produtos "
                    + " INNER JOIN tbl_produto ON tbl_produto.pk_id_produto = "
                    + " tbl_compras_produtos.fk_produto "
                    + " WHERE tbl_compras_produtos.fk_compras = '" + pCodigoCompra + "';");

            while (this.getResultSet().next()) {
                modelProdutosComprasProdutos = new ModelProdutosComprasProdutos();
                modelProdutos = new ModelProdutos();
                modelComprasProdutos = new ModelComprasProdutos();

                modelProdutos.setID_produto(this.getResultSet().getInt(1));
                modelProdutos.setQuantidade_total(this.getResultSet().getInt(2));
                modelProdutos.setNome(this.getResultSet().getString(3));
                modelProdutos.setValor_uni(this.getResultSet().getDouble(4));

                modelComprasProdutos.setProduto(this.getResultSet().getInt(5));
                modelComprasProdutos.setCompras(this.getResultSet().getInt(6));
                modelComprasProdutos.setIdCompraProduto(this.getResultSet().getInt(7));
                modelComprasProdutos.setComProQuantidade(this.getResultSet().getInt(8));
                modelComprasProdutos.setComProValor(this.getResultSet().getInt(9));

                modelProdutosComprasProdutos.setModelProdutos(modelProdutos);
                modelProdutosComprasProdutos.setModelComprasProdutos(modelComprasProdutos);

                listaModelProdutosComprasProdutos.add(modelProdutosComprasProdutos);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.fecharConexao();
        }
        return listaModelProdutosComprasProdutos;
    }
}
