package model;
/**
*
* @author brendon
*/
public class ModelProdutos {

    private Integer ID_produto;
    private String nome;
    private double valor_uni;
    private double peso;
    private double minRec;
    private String descricao;
    private Integer ID_marca;
    private String nome_marca;
    private Integer ID_categoria;
    private String categoria;
    private String desc_categoria;
    private double quantidade_total;

    /**
    * Construtor
    */
    public ModelProdutos(){}

    /**
    * seta o valor de ID_produto
    * @param pID_produto
    */
    public void setID_produto(Integer pID_produto){
        this.ID_produto = pID_produto;
    }
    /**
    * @return pk_ID_produto
    */
    public Integer getID_produto(){
        return this.ID_produto;
    }

    /**
    * seta o valor de nome
    * @param pNome
    */
    public void setNome(String pNome){
        this.nome = pNome;
    }
    /**
    * @return nome
    */
    public String getNome(){
        return this.nome;
    }

    /**
    * seta o valor de valor_uni
    * @param pValor_uni
    */
    public void setValor_uni(double pValor_uni){
        this.valor_uni = pValor_uni;
    }
    /**
    * @return valor_uni
    */
    public double getValor_uni(){
        return this.valor_uni;
    }

    /**
    * seta o valor de peso
    * @param pPeso
    */
    public void setPeso(double pPeso){
        this.peso = pPeso;
    }
    /**
    * @return peso
    */
    public double getPeso(){
        return this.peso;
    }



/**
    * seta o valor de peso
    * @param minRec
    */
    public void setMinRecomendado(double pMinRec){
        this.minRec = pMinRec;
    }
    /**
    * @return peso
    */
    public double getMInRecomendado(){
        return this.minRec;
    }


    /**
    * seta o valor de descricao
    * @param pDescricao
    */
    public void setDescricao(String pDescricao){
        this.descricao = pDescricao;
    }
    /**
    * @return descricao
    */
    public String getDescricao(){
        return this.descricao;
    }

    /**
    * seta o valor de ID_marca
    * @param pID_marca
    */
    public void setID_marca(Integer pID_marca){
        this.ID_marca = pID_marca;
    }
    /**
    * @return pk_ID_marca
    */
    public Integer getID_marca(){
        return this.ID_marca;
    }

    /**
    * seta o valor de nome_marca
    * @param pNome_marca
    */
    public void setNome_marca(String pNome_marca){
        this.nome_marca = pNome_marca;
    }
    /**
    * @return nome_marca
    */
    public String getNome_marca(){
        return this.nome_marca;
    }

    /**
    * seta o valor de ID_categoria
    * @param pID_categoria
    */
    public void setID_categoria(Integer pID_categoria){
        this.ID_categoria = pID_categoria;
    }
    /**
    * @return pk_ID_categoria
    */
    public Integer getID_categoria(){
        return this.ID_categoria;
    }

    /**
    * seta o valor de categoria
    * @param pCategoria
    */
    public void setCategoria(String pCategoria){
        this.categoria = pCategoria;
    }
    /**
    * @return categoria
    */
    public String getCategoria(){
        return this.categoria;
    }

    /**
    * seta o valor de desc_categoria
    * @param pDesc_categoria
    */
    public void setDesc_categoria(String pDesc_categoria){
        this.desc_categoria = pDesc_categoria;
    }
    /**
    * @return desc_categoria
    */
    public String getDesc_categoria(){
        return this.desc_categoria;
    }

    /**
    * seta o valor de quantidade_total
    * @param pQuantidade_total
    */
    public void setQuantidade_total(double pQuantidade_total){
        this.quantidade_total = pQuantidade_total;
    }
    /**
    * @return quantidade_total
    */
    public double getQuantidade_total(){
        return this.quantidade_total;
    }

    @Override
    public String toString(){
        return "ModelProduto {" + "::ID_produto = " + this.ID_produto + "::nome = " + this.nome + "::valor_uni = " + this.valor_uni + "::peso = " + this.peso + "::min_recomendado = " + this.minRec +"::descricao = " + this.descricao + "::ID_marca = " + this.ID_marca + "::nome_marca = " + this.nome_marca + "::ID_categoria = " + this.ID_categoria + "::categoria = " + this.categoria + "::desc_categoria = " + this.desc_categoria + "::quantidade_total = " + this.quantidade_total +  "}";
    }
}