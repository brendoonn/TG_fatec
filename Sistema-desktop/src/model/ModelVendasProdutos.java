package model;
/**
*
* @author andre
*/
public class ModelVendasProdutos {

    private int idVendaProduto;
    private int FK_Produto;
    private int FK_Venda;
    private double valor;
    private int quantidade;

    /**
    * Construtor
    */
    public ModelVendasProdutos(){}

    /**
    * seta o valor de idVendaProduto
    * @param pIdVendaProduto
    */
    public void setIdVendaProduto(int pIdVendaProduto){
        this.idVendaProduto = pIdVendaProduto;
    }
    /**
    * @return pk_idVendaProduto
    */
    public int getIdVendaProduto(){
        return this.idVendaProduto;
    }

    /**
    * seta o valor de produto
    * @param pProduto
    */
    public void setFK_Produto(int pProduto){
        this.FK_Produto = pProduto;
    }
    /**
    * @return fk_produto
    */
    public int getProduto(){
        return this.FK_Produto;
    }

    /**
    * seta o valor de vendas
    * @param pVendas
    */
    public void setFK_Vendas(int pVenda){
        this.FK_Venda = pVenda;
    }
    /**
    * @return vendas
    */
    public int getVendas(){
        return this.FK_Venda;
    }

    /**
    * seta o valor de venProValor
    * @param pVenProValor
    */
    public void setValor(double pValor){
        this.valor = pValor;
    }
    /**
    * @return venProValor
    */
    public double getValor(){
        return this.valor;
    }

    /**
    * seta o valor de venProQuantidade
    * @param pVenProQuantidade
    */
    public void setQuantidade(int pQuantidade){
        this.quantidade = pQuantidade;
    }
    /**
    * @return venProQuantidade
    */
    public int getQuantidade(){
        return this.quantidade;
    }

    @Override
    public String toString(){
        return "ModelVendasProdutos {" + "::idVendaProduto = " + this.idVendaProduto + "::produto = " + this.FK_Produto + "::venda = " + this.FK_Venda + "::Valor = " + this.valor + "::Quantidade = " + this.quantidade +  "}";
    }
}