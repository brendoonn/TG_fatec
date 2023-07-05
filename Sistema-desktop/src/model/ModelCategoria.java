package model;
/**
*
* @author Brendon
*/
public class ModelCategoria {

    private Integer ID_categoria;
    private String categoria;
    private String desc_categoria;
    private Boolean data_available;

    /**
    * Construtor
    */
    public ModelCategoria(){}

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
    * @return desc_categoria
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
        return "ModelCategoria {" + "::ID_categoria = " + this.ID_categoria +  "::categoria = " + this.categoria + "::desc_categoria = " + this.desc_categoria + "::data_available = " + this.data_available +  "}";
    }
}