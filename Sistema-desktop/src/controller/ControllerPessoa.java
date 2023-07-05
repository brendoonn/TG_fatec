package controller;

import model.ModelCliente;
import model.ModelPessoa;
import DAO.DAOPessoa;

import java.io.Console;
import java.util.ArrayList;

/**
*
* @author Brendon
*/
public class ControllerPessoa {

    private DAOPessoa daoPessoa = new DAOPessoa();

    /**
    * grava Pessoa
    * @param pModelPessoa
    * @return int
    */
    public int salvarPessoaController(ModelPessoa pModelPessoa){
        return this.daoPessoa.salvarPessoaDAO(pModelPessoa);
    }

    /**
    * recupera Pessoa
    * @param pID_pessoa
    * @return ModelPessoa
    */
    public ModelPessoa getPessoaController(Integer pID_pessoa){
        return this.daoPessoa.getPessoaDAO(pID_pessoa);
    }

/**
    * recupera Cliente
    * @param pNomePessoa 
    * @return ModelPessoa
    */
      public ModelPessoa getPessoaController(String pNomePessoa){
        return this.daoPessoa.getPessoaDAO(pNomePessoa);
    } 

/**
    * recupera Cliente
    * @param pNomePessoa 
    * @return ModelPessoa
    */
      public ModelPessoa retornarPessoaController(String pNomePessoa){
        return this.daoPessoa.retornarListaPessoaDAO(pNomePessoa);
    } 
    /**
    * recupera Cliente
    * @param pIdPessoa
    * @return ModelPessoa
    */
     public ModelPessoa getPessoaController(int pIdPessoa){
        return this.daoPessoa.getPessoaDAO(pIdPessoa);
    }  
    
    /**
    * recupera uma lista dePessoa
    * @param pID_pessoa
    * @return ArrayList
    */
    public ArrayList<ModelPessoa> getListaPessoaController(){
        return this.daoPessoa.getListaPessoaDAO();
    }

    /**
    * atualiza Pessoa
    * @param pModelPessoa
    * @return boolean
    */
    public boolean atualizarPessoaController(ModelPessoa pModelPessoa){
        return this.daoPessoa.atualizarPessoaDAO(pModelPessoa);
    }

    /**
    * exclui Pessoa
    * @param pID_pessoa
    * @return boolean
    */
    public boolean excluirPessoaController(Integer pID_pessoa){
        return this.daoPessoa.excluirPessoaDAO(pID_pessoa);
    }
}