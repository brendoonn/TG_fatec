/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import conexoes.ConexaoMySql;
import java.util.ArrayList;
import model.ModelCliente;
import model.ModelPessoa;
import model.ModelProdutos;
import model.ModelVendas;
import model.ModelVendasCliente;

/**
 *
 * @author andre
 */
public class DAOVendasCliente extends ConexaoMySql {

    public ArrayList<ModelVendasCliente> getListaVendasClientesDAO() {
        ArrayList<ModelVendasCliente> listaModelVendasClientes = new ArrayList();
        ModelVendas modelVendas = new ModelVendas();
        ModelPessoa modelPessoa= new ModelPessoa();
        ModelVendasCliente modelVendasCliente = new ModelVendasCliente();
        try {
            this.conectar();
            this.executarSQL(
                            "SELECT "
                            + "tbl_venda.ID_venda,"
                            + "tbl_venda.FK_pessoa,"
                            + "tbl_venda.data_venda,"
                            + "tbl_venda.valor_liquido,"
                            + "tbl_venda.valor_bruto,"
                            + "tbl_venda.desconto,"
                            + "tbl_pessoa.ID_pessoa,"
                            + "tbl_pessoa.nome,"
                            + "tbl_endereco.ID_endereco,"
                            + "tbl_endereco.cidade,"
                            + "tbl_endereco.bairro,"
                            + "tbl_endereco.rua,"
                            + "tbl_endereco.uf,"
                            + "tbl_endereco.numero,"
                            + "tbl_endereco.referencia,"
                            + "tbl_endereco.cep,"
                            + "tbl_endereco.FK_pessoa "
                        + "FROM"
                            + " tbl_venda "
                        + "INNER JOIN tbl_pessoa ON tbl_pessoa.ID_pessoa = tbl_venda.FK_pessoa "
                        + "INNER JOIN tbl_endereco ON tbl_pessoa.ID_pessoa = tbl_endereco.FK_pessoa "  
                        + "WHERE tbl_pessoa.data_available = true");


            while (this.getResultSet().next()) {
                System.out.print(this.getResultSet());
                modelVendas = new ModelVendas();
                modelPessoa = new ModelPessoa();
                modelVendasCliente = new ModelVendasCliente();
                
                //vendas
                modelVendas.setIdVenda(this.getResultSet().getInt(1));
                modelVendas.setFk_pessoa(this.getResultSet().getInt(2));
                modelVendas.setDataVenda(this.getResultSet().getDate(3));
                modelVendas.setVenValorLiquido(this.getResultSet().getDouble(4));
                modelVendas.setVenValorBruto(this.getResultSet().getDouble(5));
                modelVendas.setVenDesconto(this.getResultSet().getDouble(6));
                //cliente
                modelPessoa.setID_pessoa(this.getResultSet().getInt(7));
                modelPessoa.setNome(this.getResultSet().getString(8));
                modelPessoa.setID_endereco(this.getResultSet().getInt(9));
                modelPessoa.setCidade(this.getResultSet().getString(10));
                modelPessoa.setBairro(this.getResultSet().getString(11));
                modelPessoa.setRua(this.getResultSet().getString(12));
                modelPessoa.setUf(this.getResultSet().getString(13));
                modelPessoa.setNumero(this.getResultSet().getInt(14));
                modelPessoa.setReferencia(this.getResultSet().getString(15));
                modelPessoa.setCep(this.getResultSet().getString(16));
                modelPessoa.setFK_pessoa(this.getResultSet().getInt(17));
                
                modelVendasCliente.setModelVendas(modelVendas);
                modelVendasCliente.setModelPessoa(modelPessoa);
                
                listaModelVendasClientes.add(modelVendasCliente);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.print(e);
        } finally {
            this.fecharConexao();
        }
        return listaModelVendasClientes;

    }
}
