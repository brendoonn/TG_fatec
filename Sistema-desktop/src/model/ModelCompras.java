package model;

import java.sql.Date;

/**
*
* @author André
*/
public class ModelCompras {

    private int idCompra;
    private int fornecedor;
    private Date comDataCompra;
    private double comValorLiquido;
    private double comValorBruto;
    private double comDesconto;

    /**
    * Construtor
    */
    public ModelCompras(){}

    /**
    * seta o valor de idCompra
    * @param pIdCompra
    */
    public void setIdCompra(int pIdCompra){
        this.idCompra = pIdCompra;
    }
    /**
    * @return pk_idCompra
    */
    public int getIdCompra(){
        return this.idCompra;
    }

    /**
    * seta o valor de fornecedor
    * @param pFornecedor
    */
    public void setFornecedor(int pFornecedor){
        this.fornecedor = pFornecedor;
    }
    /**
    * @return fk_fornecedor
    */
    public int getFornecedor(){
        return this.fornecedor;
    }

    /**
    * seta o valor de comDataCompra
    * @param pComDataCompra
    */
    public void setComDataCompra(Date pComDataCompra){
        this.comDataCompra = pComDataCompra;
    }
    /**
    * @return comDataCompra
    */
    public Date getComDataCompra(){
        return this.comDataCompra;
    }

    /**
    * seta o valor de comValorLiquido
    * @param pComValorLiquido
    */
    public void setComValorLiquido(double pComValorLiquido){
        this.comValorLiquido = pComValorLiquido;
    }
    /**
    * @return comValorLiquido
    */
    public double getComValorLiquido(){
        return this.comValorLiquido;
    }

    /**
    * seta o valor de comValorBruto
    * @param pComValorBruto
    */
    public void setComValorBruto(double pComValorBruto){
        this.comValorBruto = pComValorBruto;
    }
    /**
    * @return comValorBruto
    */
    public double getComValorBruto(){
        return this.comValorBruto;
    }

    /**
    * seta o valor de comDesconto
    * @param pComDesconto
    */
    public void setComDesconto(double pComDesconto){
        this.comDesconto = pComDesconto;
    }
    /**
    * @return comDesconto
    */
    public double getComDesconto(){
        return this.comDesconto;
    }

    @Override
    public String toString(){
        return "ModelCompras {" + "::idCompra = " + this.idCompra + "::fornecedor = " + this.fornecedor + "::comDataCompra = " + this.comDataCompra + "::comValorLiquido = " + this.comValorLiquido + "::comValorBruto = " + this.comValorBruto + "::comDesconto = " + this.comDesconto +  "}";
    }
}