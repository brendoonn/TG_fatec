/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import conexoes.ConexaoMySql;
import java.util.ArrayList;
import model.ModelProdutos;
import model.ModelProdutosVendasProdutos;
import model.ModelVendasProdutos;

/**
 *
 * @author andre
 */
public class DAOProdutosVendasProdutos extends ConexaoMySql {

    public ArrayList<ModelProdutosVendasProdutos> getListaProdutosVendasProdutosDAO(int pCodigoVenda) {
        ArrayList<ModelProdutosVendasProdutos> listaModelProdutosVendasProdutos = new ArrayList<>();
        ModelProdutosVendasProdutos modelProdutosVendasProdutos = new ModelProdutosVendasProdutos();
        ModelProdutos modelProdutos = new ModelProdutos();
        ModelVendasProdutos modelVendasProdutos = new ModelVendasProdutos();
        try {
            this.conectar();
            this.executarSQL("SELECT "
                    + " tbl_produto.ID_produto,"
                    + " tbl_produto.nome,"
                    + " tbl_produto.valor_uni,"
                    + " tbl_vendas_produto.fk_produto,"
                    + " tbl_vendas_produto.fk_venda,"
                    + " tbl_vendas_produto.ID_venda_produto,"
                    + " tbl_vendas_produto.quantidade,"
                    + " FROM tbl_vendas_produtos "
                    + " INNER JOIN tbl_produto ON tbl_produto.ID_produto = "
                    + " tbl_vendas_produtos.fk_produto "
                    + " WHERE tbl_vendas_produtos.fk_venda = '" + pCodigoVenda + "';");

            while (this.getResultSet().next()) {
                modelProdutosVendasProdutos = new ModelProdutosVendasProdutos();
                modelProdutos = new ModelProdutos();
                modelVendasProdutos = new ModelVendasProdutos();

                modelProdutos.setID_produto(this.getResultSet().getInt(1));
                modelProdutos.setQuantidade_total(this.getResultSet().getInt(2));
                modelProdutos.setNome(this.getResultSet().getString(3));
                modelProdutos.setValor_uni(this.getResultSet().getDouble(4));

                modelVendasProdutos.setFK_Produto(this.getResultSet().getInt(5));
                modelVendasProdutos.setFK_Vendas(this.getResultSet().getInt(6));
                modelVendasProdutos.setIdVendaProduto(this.getResultSet().getInt(7));
                modelVendasProdutos.setQuantidade(this.getResultSet().getInt(8));
                modelVendasProdutos.setValor(this.getResultSet().getInt(9));

                modelProdutosVendasProdutos.setModelProdutos(modelProdutos);
                modelProdutosVendasProdutos.setModelVendasProdutos(modelVendasProdutos);

                listaModelProdutosVendasProdutos.add(modelProdutosVendasProdutos);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.fecharConexao();
        }
        return listaModelProdutosVendasProdutos;
    }
}
