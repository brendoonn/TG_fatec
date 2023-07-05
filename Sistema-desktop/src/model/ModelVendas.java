package model;

import java.sql.Date;

/**
*
* @author andre
*/
public class ModelVendas {

    private int ID_Venda;
    private int FK_pessoa;
    private int FK_funcionario;
    private String forma_pagamento;
    private int FK_forma_pagamento;
    private Date dataVenda;
    private double valorLiquido;
    private double valorBruto;
    private double desconto;
    private double descricao;

    /**
    * Construtor
    */
    public ModelVendas(){}

    /**
    * seta o valor de idVenda
    * @param pIdVenda
    */
    public void setIdVenda(int pIdVenda){
        this.ID_Venda = pIdVenda;
    }
    /**
    * @return pk_idVenda
    */
    public int getIdVenda(){
        return this.ID_Venda;
    }



    /**
    * seta o valor de pessoa
    * @param pFk_pessoa
    */
    public void setFk_pessoa(int pFk_pessoa){
        this.FK_pessoa = pFk_pessoa;
    }
    /**
    * @return pk_idVenda
    */
    public int getFk_pessoa(){
        return this.FK_pessoa;
    }

    /**
    * seta o valor de idVenda
    * @param pIdVenda
    */
    public void setFK_funcionario(int pFK_funcionario){
        this.FK_funcionario = pFK_funcionario;
    }
    /**
    * @return pk_idVenda
    */
    public int getFK_funcionario(){
        return this.FK_funcionario;
    }
    /**
    * seta o valor de idVenda
    * @param pIdVenda
    */
    public void setFK_forma_pagamento(Integer pFK_forma_pagamento){
        this.FK_forma_pagamento = pFK_forma_pagamento;
    }
    /**
    * @return pk_idVenda
    */
    public Integer getFK_forma_pagamento(){
        return this.FK_forma_pagamento;
    }


    /**
    * seta o valor de idVenda
    * @param pIdVenda
    */
    public void setForma_pagamento(String pForma_pagamento){
        this.forma_pagamento = pForma_pagamento;
    }
    /**
    * @return pk_idVenda
    */
    public String getForma_pagamento(){
        return this.forma_pagamento;
    }




    /**
    * seta o valor de venDataVenda
    * @param pDataVenda
    */
    public void setDataVenda(Date pDataVenda){
        this.dataVenda = pDataVenda;
    }
    /**
    * @return dataVenda
    */
    public Date getDataVenda(){
        return this.dataVenda;
    }

    /**
    * seta o valor de venValorLiquido
    * @param pVenValorLiquido
    */
    public void setVenValorLiquido(double pVenValorLiquido){
        this.valorLiquido = pVenValorLiquido;
    }
    /**
    * @return venValorLiquido
    */
    public double getVenValorLiquido(){
        return this.valorLiquido;
    }

    /**
    * seta o valor de venValorBruto
    * @param pVenValorBruto
    */
    public void setVenValorBruto(double pVenValorBruto){
        this.valorBruto = pVenValorBruto;
    }
    /**
    * @return venValorBruto
    */
    public double getVenValorBruto(){
        return this.valorBruto;
    }

    /**
    * seta o valor de venDesconto
    * @param pVenDesconto
    */
    public void setVenDesconto(double pVenDesconto){
        this.desconto = pVenDesconto;
    }
    /**
    * @return venDesconto
    */
    public double getVenDesconto(){
        return this.desconto;
    }

    @Override
    public String toString(){
        return "ModelVendas {" + "::ID_Venda = " + this.ID_Venda + "::pessoa = " + this.FK_pessoa +  "::FK_funcionario = " + this.FK_funcionario + "::FK_forma_pagamento = " + this.FK_forma_pagamento + "::data_venda = " + this.dataVenda + "::valorLiquido = " + this.valorLiquido + "::valorBruto = " + this.valorBruto + "::desconto = " + this.desconto + "::descricao = " + this.descricao + "}";
    }
}