package DAO;

import model.ModelFormaPagamento;
import model.ModelMeioPagamento;
import conexoes.ConexaoMySql;
import java.util.ArrayList;
/**
*
* @author Brendon
*/
public class DAOMeioPagamento extends ConexaoMySql {

    /**
    * grava MeioPagamento
    * @param pModelMeioPagamento
    * @return int
    */
    public int salvarMeioPagamentoDAO(ModelMeioPagamento pModelMeioPagamento){
        try {
            this.conectar();
            return this.insertSQL(
                "INSERT INTO tbl_forma_pagamento ("
                    + "pk__id_forma_pagamento,"
                    + "forma_pag,"
                    + "data_available"
                + ") VALUES ("
                    + "'" + pModelMeioPagamento.getID_forma_pagamento() + "',"
                    + "'" + pModelMeioPagamento.getForma_pag() + "',"
                    + "'" + pModelMeioPagamento.getData_available() + "'"
                + ");"
            );
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }finally{
            this.fecharConexao();
        }
    }

    /**
    * recupera MeioPagamento
    * @param pID_forma_pagamento
    * @return ModelMeioPagamento
    */
    public ModelMeioPagamento getMeioPagamentoDAO(Integer pID_forma_pagamento){
        ModelMeioPagamento modelMeioPagamento = new ModelMeioPagamento();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk__id_forma_pagamento,"
                    + "forma_pag,"
                    + "data_available"
                 + " FROM"
                     + " tbl_forma_pagamento"
                 + " WHERE"
                     + " pk__id_forma_pagamento = '" + pID_forma_pagamento + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelMeioPagamento.setID_forma_pagamento(this.getResultSet().getInt(1));
                modelMeioPagamento.setForma_pag(this.getResultSet().getString(2));
                modelMeioPagamento.setData_available(this.getResultSet().getBoolean(3));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelMeioPagamento;
    }

    /**
    * recupera MeioPagamento
    * @param pID_forma_pagamento
    * @return ModelMeioPagamento
    */
    public Integer getIdMeioPagamentoDAO(String pforma_pagamento){
        ModelFormaPagamento modelFormaPagamento = new ModelFormaPagamento();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_forma_pagamento "
                 + "FROM "
                     + "tbl_forma_pagamento "
                 + " WHERE"
                     + " forma_pag = '" + pforma_pagamento + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelFormaPagamento.setID_forma_pagamento(this.getResultSet().getInt(1));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelFormaPagamento.getID_forma_pagamento();
    }

    /**
    * recupera uma lista de MeioPagamento
        * @return ArrayList
    */
    public ArrayList<ModelMeioPagamento> getListaMeioPagamentoDAO(){
        ArrayList<ModelMeioPagamento> listamodelMeioPagamento = new ArrayList();
        ModelMeioPagamento modelMeioPagamento = new ModelMeioPagamento();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk__id_forma_pagamento,"
                    + "forma_pag,"
                    + "data_available"
                 + " FROM"
                     + " tbl_forma_pagamento"
                + ";"
            );

            while(this.getResultSet().next()){
                modelMeioPagamento = new ModelMeioPagamento();
                modelMeioPagamento.setID_forma_pagamento(this.getResultSet().getInt(1));
                modelMeioPagamento.setForma_pag(this.getResultSet().getString(2));
                modelMeioPagamento.setData_available(this.getResultSet().getBoolean(3));
                listamodelMeioPagamento.add(modelMeioPagamento);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listamodelMeioPagamento;
    }

    /**
    * atualiza MeioPagamento
    * @param pModelMeioPagamento
    * @return boolean
    */
    public boolean atualizarMeioPagamentoDAO(ModelMeioPagamento pModelMeioPagamento){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_forma_pagamento SET "
                    + "pk__id_forma_pagamento = '" + pModelMeioPagamento.getID_forma_pagamento() + "',"
                    + "forma_pag = '" + pModelMeioPagamento.getForma_pag() + "',"
                    + "data_available = '" + pModelMeioPagamento.getData_available() + "'"
                + " WHERE "
                    + "pk__id_forma_pagamento = '" + pModelMeioPagamento.getID_forma_pagamento() + "'"
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
    * exclui MeioPagamento
    * @param pID_forma_pagamento
    * @return boolean
    */
    public boolean excluirMeioPagamentoDAO(Integer pID_forma_pagamento){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "DELETE FROM tbl_forma_pagamento "
                + " WHERE "
                    + "pk__id_forma_pagamento = '" + pID_forma_pagamento + "'"
                + ";"
            );
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }finally{
            this.fecharConexao();
        }
    }
}