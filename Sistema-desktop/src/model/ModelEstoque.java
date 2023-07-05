package model;

import java.sql.Date;


public class ModelEstoque {
    private int idEstoque;
    private int fkProduto;
    private int fkCompra;
    private int quantidadeInicial;
    private int quantidadeAtual;
    private double valorUniCompra;
    private Date dataValidadeLote;
    private boolean dataAvailable;

    public ModelEstoque(int idEstoque, int fkProduto, int fkCompra, int quantidadeInicial, int quantidadeAtual,
                   double valorUniCompra, Date dataValidadeLote, boolean dataAvailable) {
        this.idEstoque = idEstoque;
        this.fkProduto = fkProduto;
        this.fkCompra = fkCompra;
        this.quantidadeInicial = quantidadeInicial;
        this.quantidadeAtual = quantidadeAtual;
        this.valorUniCompra = valorUniCompra;
        this.dataValidadeLote = dataValidadeLote;
        this.dataAvailable = dataAvailable;
    }

    public int getIdEstoque() {
        return idEstoque;
    }

    public void setIdEstoque(int idEstoque) {
        this.idEstoque = idEstoque;
    }

    public int getFkProduto() {
        return fkProduto;
    }

    public void setFkProduto(int fkProduto) {
        this.fkProduto = fkProduto;
    }

    public int getFkCompra() {
        return fkCompra;
    }

    public void setFkCompra(int fkCompra) {
        this.fkCompra = fkCompra;
    }

    public int getQuantidadeInicial() {
        return quantidadeInicial;
    }

    public void setQuantidadeInicial(int quantidadeInicial) {
        this.quantidadeInicial = quantidadeInicial;
    }

    public int getQuantidadeAtual() {
        return quantidadeAtual;
    }

    public void setQuantidadeAtual(int quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }

    public double getValorUniCompra() {
        return valorUniCompra;
    }

    public void setValorUniCompra(double valorUniCompra) {
        this.valorUniCompra = valorUniCompra;
    }

    public Date getDataValidadeLote() {
        return dataValidadeLote;
    }

    public void setDataValidadeLote(Date dataValidadeLote) {
        this.dataValidadeLote = dataValidadeLote;
    }

    public boolean isDataAvailable() {
        return dataAvailable;
    }

    public void setDataAvailable(boolean dataAvailable) {
        this.dataAvailable = dataAvailable;
    }
}
