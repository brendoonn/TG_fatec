package model;
/**
*
* @author André
*/
public class ModelComprasProdutos {

    private int idCompraProduto;
    private int produto;
    private int compras;
    private double comProValor;
    private double comProQuantidade;

    /**
    * Construtor
    */
    public ModelComprasProdutos(){}

    /**
    * seta o valor de idCompraProduto
    * @param pIdCompraProduto
    */
    public void setIdCompraProduto(int pIdCompraProduto){
        this.idCompraProduto = pIdCompraProduto;
    }
    /**
    * @return pk_idCompraProduto
    */
    public int getIdCompraProduto(){
        return this.idCompraProduto;
    }

    /**
    * seta o valor de produto
    * @param pProduto
    */
    public void setProduto(int pProduto){
        this.produto = pProduto;
    }
    /**
    * @return fk_produto
    */
    public int getProduto(){
        return this.produto;
    }

    /**
    * seta o valor de compras
    * @param pCompras
    */
    public void setCompras(int pCompras){
        this.compras = pCompras;
    }
    /**
    * @return fk_compras
    */
    public int getCompras(){
        return this.compras;
    }

    /**
    * seta o valor de comProValor
    * @param pComProValor
    */
    public void setComProValor(double pComProValor){
        this.comProValor = pComProValor;
    }
    /**
    * @return comProValor
    */
    public double getComProValor(){
        return this.comProValor;
    }

    /**
    * seta o valor de comProQuantidade
    * @param pComProQuantidade
    */
    public void setComProQuantidade(double pComProQuantidade){
        this.comProQuantidade = pComProQuantidade;
    }
    /**
    * @return comProQuantidade
    */
    public double getComProQuantidade(){
        return this.comProQuantidade;
    }

    @Override
    public String toString(){
        return "ModelComprasProdutos {" + "::idCompraProduto = " + this.idCompraProduto + "::produto = " + this.produto + "::compras = " + this.compras + "::comProValor = " + this.comProValor + "::comProQuantidade = " + this.comProQuantidade +  "}";
    }
}