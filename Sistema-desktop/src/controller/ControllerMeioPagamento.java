package controller;

import model.ModelMeioPagamento;
import DAO.DAOMeioPagamento;
import java.util.ArrayList;

/**
*
* @author Brendon
*/
public class ControllerMeioPagamento {

    private static DAOMeioPagamento daoMeioPagamento = new DAOMeioPagamento();

    /**
    * grava MeioPagamento
    * @param pModelMeioPagamento
    * @return int
    */
    public int salvarMeioPagamentoController(ModelMeioPagamento pModelMeioPagamento){
        return this.daoMeioPagamento.salvarMeioPagamentoDAO(pModelMeioPagamento);
    }

    /**
    * recupera MeioPagamento
    * @param pID_forma_pagamento
    * @return ModelMeioPagamento
    */
    public ModelMeioPagamento getMeioPagamentoController(Integer pID_forma_pagamento){
        return this.daoMeioPagamento.getMeioPagamentoDAO(pID_forma_pagamento);
    }
    public static Integer getMeioPagamentoID(String pID_forma_pagamento){
        return daoMeioPagamento.getIdMeioPagamentoDAO(pID_forma_pagamento);
    }

    /**
    * recupera uma lista deMeioPagamento
    * @param pID_forma_pagamento
    * @return ArrayList
    */
    public ArrayList<ModelMeioPagamento> getListaMeioPagamentoController(){
        return this.daoMeioPagamento.getListaMeioPagamentoDAO();
    }

    /**
    * atualiza MeioPagamento
    * @param pModelMeioPagamento
    * @return boolean
    */
    public boolean atualizarMeioPagamentoController(ModelMeioPagamento pModelMeioPagamento){
        return this.daoMeioPagamento.atualizarMeioPagamentoDAO(pModelMeioPagamento);
    }

    /**
    * exclui MeioPagamento
    * @param pID_forma_pagamento
    * @return boolean
    */
    public boolean excluirMeioPagamentoController(Integer pID_forma_pagamento){
        return this.daoMeioPagamento.excluirMeioPagamentoDAO(pID_forma_pagamento);
    }
}