package model;
/**
*
* @author Brendon
*/
public class ModelMarca {

    private Integer ID_marca;
    private String nome_marca;
    private Boolean data_available;

    /**
    * Construtor
    */
    public ModelMarca() {}

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
    * seta o valor de data_available
    * @param pData_available
    */
    public void setData_available(Boolean pData_available){
        this.data_available = pData_available;
    }
    /**
    * @return data_available
    */
    public Boolean getData_available(){
        return this.data_available;
    }

    @Override
    public String toString(){
        return "ModelMarca {" + "::ID_marca = " + this.ID_marca + "::nome_marca = " + this.nome_marca + "::data_available = " + this.data_available +  "}";
    }
}