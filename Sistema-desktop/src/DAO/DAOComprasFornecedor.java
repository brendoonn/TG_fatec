/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import conexoes.ConexaoMySql;
import java.util.ArrayList;
import model.ModelCompras;
import model.ModelComprasFornecedor;
import model.ModelFornecedor;

/**
 *
 * @author andre
 */
public class DAOComprasFornecedor extends ConexaoMySql{
    
    public ArrayList<ModelComprasFornecedor> getListaComprasFornecedorDAO(){
        ArrayList<ModelComprasFornecedor> listaModelComprasFornecedor = new ArrayList();
        ModelCompras modelCompras = new ModelCompras();
        ModelFornecedor modelFornecedor = new ModelFornecedor();
        ModelComprasFornecedor modelComprasFornecedor = new ModelComprasFornecedor();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "tbl_compras.pk_id_compra,"
                    + "tbl_compras.fk_fornecedor,"
                    + "tbl_compras.com_data_compra,"
                    + "tbl_compras.com_valor_liquido,"
                    + "tbl_compras.com_valor_bruto,"
                    + "tbl_compras.com_desconto,"
		    + "tbl_fornecedor.pk_id_fornecedor,"
                    + "tbl_fornecedor.for_cnpj,"
                    + "tbl_fornecedor.for_nome,"
                    + "tbl_fornecedor.for_endereco,"
                    + "tbl_fornecedor.for_bairro,"
                    + "tbl_fornecedor.for_cidade,"
                    + "tbl_fornecedor.for_uf,"
                    + "tbl_fornecedor.for_cep,"
                    + "tbl_fornecedor.for_telefone"
                    + " FROM"
                    + " tbl_compras INNER JOIN tbl_fornecedor "
                    + "ON tbl_fornecedor.pk_id_fornecedor = tbl_compras.fk_fornecedor; "        
                    + ";"
            );

            while(this.getResultSet().next()){
                modelCompras = new ModelCompras();
                modelFornecedor = new ModelFornecedor();
                modelComprasFornecedor = new ModelComprasFornecedor();
                //compras
                modelCompras.setIdCompra(this.getResultSet().getInt(1));
                modelCompras.setFornecedor(this.getResultSet().getInt(2));
                modelCompras.setComDataCompra(this.getResultSet().getDate(3));
                modelCompras.setComValorLiquido(this.getResultSet().getDouble(4));
                modelCompras.setComValorBruto(this.getResultSet().getDouble(5));
                modelCompras.setComDesconto(this.getResultSet().getDouble(6));
                //fornecedor
                modelFornecedor = new ModelFornecedor();
                modelFornecedor.setIdFornecedor(this.getResultSet().getInt(7));
                modelFornecedor.setForCnpj(this.getResultSet().getString(8));
                modelFornecedor.setForNome(this.getResultSet().getString(9));
                modelFornecedor.setForEndereco(this.getResultSet().getString(10));
                modelFornecedor.setForBairro(this.getResultSet().getString(11));
                modelFornecedor.setForCidade(this.getResultSet().getString(12));
                modelFornecedor.setForUf(this.getResultSet().getString(13));
                modelFornecedor.setForCep(this.getResultSet().getString(14));
                modelFornecedor.setForTelefone(this.getResultSet().getString(15));
                
                modelComprasFornecedor.setModelCompras(modelCompras);
                modelComprasFornecedor.setModelFornecedor(modelFornecedor);
                
                listaModelComprasFornecedor.add(modelComprasFornecedor);                
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listaModelComprasFornecedor;
    }    
    
}
