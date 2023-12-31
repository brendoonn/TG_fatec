/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import javax.swing.JFrame;

import controller.ControllerCategoria;
import controller.ControllerMarca;
import controller.ControllerProdutos;
import java.util.ArrayList;
import java.util.List;
import javax.swing.JOptionPane;
import javax.swing.RowFilter;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableModel;
import javax.swing.table.TableRowSorter;

import model.ModelCategoria;
import model.ModelMarca;
import model.ModelProdutos;
import util.Formatador;

/**
 *
 * @author andre
 */
public class viewProduto extends javax.swing.JFrame {
    
    ArrayList<ModelProdutos> listaModelProdutos = new ArrayList<>();
    ArrayList<ModelMarca> listaModelMarcas = new ArrayList<>();
    ArrayList<ModelCategoria> listaModelCategorias = new ArrayList<>();

    ControllerProdutos controllerProdutos = new ControllerProdutos();
    ControllerMarca controllerMarcas = new ControllerMarca();
    ControllerCategoria controllerCategoria = new ControllerCategoria();

    ModelProdutos modelProdutos = new ModelProdutos();
    Formatador formatador = new Formatador();
    String salvarAlterar;
    
    

    /**
     * Creates new form viewProduto
     */
    public viewProduto() {
        initComponents();
        carregarProdutos();
        carregarMarcas();
        carregarCategorias();
        setLocationRelativeTo(null);
        habilitarDesabilitarCampos(false);
        this.limparCampos();
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabel4 = new javax.swing.JLabel();
        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        jtfCodigo = new javax.swing.JTextField();
        jLabel2 = new javax.swing.JLabel();
        jtfNome = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        jScrollPane1 = new javax.swing.JScrollPane();
        jtableProdutos = new javax.swing.JTable();
        jLabel6 = new javax.swing.JLabel();
        jtfPesquisar = new javax.swing.JTextField();
        jbPesquisar = new javax.swing.JButton();
        jbCancelar = new javax.swing.JButton();
        jbNovo = new javax.swing.JButton();
        jbAlterar = new javax.swing.JButton();
        jbExcluir = new javax.swing.JButton();
        jbSalvar = new javax.swing.JButton();
        jtfEstoque = new javax.swing.JFormattedTextField();
        jtfValor = new javax.swing.JFormattedTextField();
        jtfPeso = new javax.swing.JFormattedTextField();
        jtfMin_Recomendado = new javax.swing.JFormattedTextField();
        jLabel7 = new javax.swing.JLabel();
        jcbCategoria = new javax.swing.JComboBox<>();
        jcbMarca = new javax.swing.JComboBox<>();
        jLabel8 = new javax.swing.JLabel();
        jtfDescricao = new javax.swing.JTextField();
        jLabel9 = new javax.swing.JLabel();
        jLabel10 = new javax.swing.JLabel();
        jLabel11 = new javax.swing.JLabel();

        jLabel4.setText("jLabel4");

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setTitle("PRODUTOS");



        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
       // getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jLabel1.setText("Código:");

        jtfCodigo.setEnabled(false);

        jLabel2.setText("Nome:");

        jLabel3.setText("Estoque:");

        jLabel5.setText("Valor:");

        jtableProdutos.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {

            },
            new String [] {
                "Código", "Nome", "Quantidade", "Valor"
            }
        ) {
            Class[] types = new Class [] {
                java.lang.Integer.class, java.lang.String.class, java.lang.Integer.class, java.lang.Double.class
            };
            boolean[] canEdit = new boolean [] {
                false, false, true, false
            };

            public Class getColumnClass(int columnIndex) {
                return types [columnIndex];
            }

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        jScrollPane1.setViewportView(jtableProdutos);
        if (jtableProdutos.getColumnModel().getColumnCount() > 0) {
            jtableProdutos.getColumnModel().getColumn(1).setMinWidth(300);
            jtableProdutos.getColumnModel().getColumn(1).setPreferredWidth(300);
        }

        jLabel6.setText("Pesquisar:");

        jbPesquisar.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagens/24x24/find.png"))); // NOI18N
        jbPesquisar.setText("Pesquisar");
        jbPesquisar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jbPesquisarActionPerformed(evt);
            }
        });

        jbCancelar.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagens/24x24/remove.png"))); // NOI18N
        jbCancelar.setText("Cancelar");
        jbCancelar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jbCancelarActionPerformed(evt);
            }
        });

        jbNovo.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagens/24x24/new.png"))); // NOI18N
        jbNovo.setText("Novo");
        jbNovo.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jbNovoActionPerformed(evt);
            }
        });

        jbAlterar.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagens/24x24/edit.png"))); // NOI18N
        jbAlterar.setText("Alterar");
        jbAlterar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jbAlterarActionPerformed(evt);
            }
        });

        jbExcluir.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagens/24x24/trash.png"))); // NOI18N
        jbExcluir.setText("Excluir");
        jbExcluir.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jbExcluirActionPerformed(evt);
            }
        });

        jbSalvar.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagens/24x24/save.png"))); // NOI18N
        jbSalvar.setText("Salvar");
        jbSalvar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jbSalvarActionPerformed(evt);
            }
        });

        jtfEstoque.setFormatterFactory(new javax.swing.text.DefaultFormatterFactory(new javax.swing.text.NumberFormatter(java.text.NumberFormat.getIntegerInstance())));
        jtfEstoque.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jtfEstoqueActionPerformed(evt);
            }
        });

        jtfValor.setFormatterFactory(new javax.swing.text.DefaultFormatterFactory(new javax.swing.text.NumberFormatter(new java.text.DecimalFormat("#,##0.00"))));

        jtfPeso.setFormatterFactory(new javax.swing.text.DefaultFormatterFactory(new javax.swing.text.NumberFormatter(new java.text.DecimalFormat("#,##0.00"))));

        
        jLabel7.setText("Peso:");

        jLabel8.setText("Descrição:");

        jLabel9.setText("Categoria:");

        jLabel10.setText("Marca:");

        jtfMin_Recomendado.setFormatterFactory(new javax.swing.text.DefaultFormatterFactory(new javax.swing.text.NumberFormatter(java.text.NumberFormat.getIntegerInstance())));
        jtfMin_Recomendado.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jtfMin_RecomendadoActionPerformed(evt);
            }
        });

        jLabel11.setText("Min. Recomendado");

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane1)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(jLabel6)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jtfPesquisar, javax.swing.GroupLayout.PREFERRED_SIZE, 384, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jbPesquisar, javax.swing.GroupLayout.PREFERRED_SIZE, 143, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(0, 0, Short.MAX_VALUE))
                    .addComponent(jtfDescricao)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(jLabel8)
                        .addGap(135, 624, Short.MAX_VALUE))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jLabel1)
                            .addComponent(jtfCodigo, javax.swing.GroupLayout.DEFAULT_SIZE, 80, Short.MAX_VALUE)
                            .addComponent(jLabel3)
                            .addComponent(jtfEstoque))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jtfNome)
                            .addGroup(jPanel1Layout.createSequentialGroup()
                                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addGroup(jPanel1Layout.createSequentialGroup()
                                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(jLabel5)
                                            .addComponent(jtfValor))
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addGroup(jPanel1Layout.createSequentialGroup()
                                                .addComponent(jLabel7)
                                                .addGap(0, 0, Short.MAX_VALUE))
                                            .addComponent(jtfPeso, javax.swing.GroupLayout.Alignment.TRAILING))
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addGroup(jPanel1Layout.createSequentialGroup()
                                                .addComponent(jLabel11)
                                                .addGap(0, 0, Short.MAX_VALUE))
                                            .addComponent(jtfMin_Recomendado, javax.swing.GroupLayout.Alignment.TRAILING))
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(jcbCategoria, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                            .addComponent(jLabel9))
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED))
                                    .addGroup(jPanel1Layout.createSequentialGroup()
                                        .addComponent(jLabel2)
                                        .addGap(35, 35, 35)))
                                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jcbMarca, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(jLabel10))))
                        .addContainerGap())
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(jbCancelar, javax.swing.GroupLayout.PREFERRED_SIZE, 115, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jbNovo, javax.swing.GroupLayout.PREFERRED_SIZE, 116, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jbAlterar, javax.swing.GroupLayout.PREFERRED_SIZE, 110, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jbExcluir, javax.swing.GroupLayout.PREFERRED_SIZE, 105, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(jbSalvar, javax.swing.GroupLayout.PREFERRED_SIZE, 126, javax.swing.GroupLayout.PREFERRED_SIZE))))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel1)
                    .addComponent(jLabel2))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jtfCodigo, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jtfNome, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                .addComponent(jLabel3)
                                .addComponent(jLabel5))
                            .addComponent(jLabel7))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jtfEstoque, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jtfValor, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel9, javax.swing.GroupLayout.PREFERRED_SIZE, 16, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                .addComponent(jLabel10)
                                .addComponent(jLabel11)))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jcbCategoria, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jcbMarca, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jtfMin_Recomendado, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jtfPeso, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jLabel8)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jtfDescricao, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel6)
                    .addComponent(jtfPesquisar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jbPesquisar))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 256, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jbCancelar)
                    .addComponent(jbNovo)
                    .addComponent(jbAlterar)
                    .addComponent(jbExcluir)
                    .addComponent(jbSalvar))
                .addContainerGap(30, Short.MAX_VALUE))
        );

       // getContentPane().add(jPanel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 6, -1, -1));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jbSalvarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jbSalvarActionPerformed
        
        if(salvarAlterar.equals("salvar")){
            this.salvarProduto();
        }else if(salvarAlterar.equals("alterar")){
            this.alterarProduto();
        }
        
        
        
    }//GEN-LAST:event_jbSalvarActionPerformed

    private void jbExcluirActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jbExcluirActionPerformed
        // Exclui um produto no banco
        int linha = jtableProdutos.getSelectedRow();
        int codigoProduto = (int) jtableProdutos.getValueAt(linha, 0);
        double quantidade = (double) jtableProdutos.getValueAt(linha, 2);
        if(quantidade >0){
                JOptionPane.showMessageDialog(this, "Não é possível apagar produtos com quantidade em estoque!", "ATENÇÃO", JOptionPane.WARNING_MESSAGE);
        }
        else{
    
        if(controllerProdutos.excluirProdutoController(codigoProduto)){
            JOptionPane.showMessageDialog(this, "Produto excluído com sucesso!", "ATENÇÃO", JOptionPane.WARNING_MESSAGE);
            this.carregarProdutos();
            this.habilitarDesabilitarCampos(false);
        }else{
            JOptionPane.showMessageDialog(this, "Erro ao excluir o produto!", "ERRO", JOptionPane.ERROR_MESSAGE);
        }    
        }
    }//GEN-LAST:event_jbExcluirActionPerformed

    private void jbNovoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jbNovoActionPerformed
        // TODO add your handling code here:
        habilitarCampos(true);
        salvarAlterar = "salvar";
        
    }//GEN-LAST:event_jbNovoActionPerformed

    private void jbCancelarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jbCancelarActionPerformed
        // TODO add your handling code here:
         this.habilitarDesabilitarCampos(false);     
         this.limparCampos();
    }//GEN-LAST:event_jbCancelarActionPerformed

    private void jbAlterarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jbAlterarActionPerformed
        // TODO add your handling code here:
        salvarAlterar = "alterar";
        habilitarDesabilitarCampos(true);
        int linha = this.jtableProdutos.getSelectedRow();
        try{
        int codigoProduto = (int) this.jtableProdutos.getValueAt(linha, 0);
            //recuperar dados do banco
            modelProdutos = controllerProdutos.retornarProdutoController(codigoProduto);
            //setar na interface
            this.jtfCodigo.setText(String.valueOf(modelProdutos.getID_produto()));
            this.jtfNome.setText(modelProdutos.getNome());
            this.jtfEstoque.setText(String.valueOf(modelProdutos.getQuantidade_total()));
            this.jtfValor.setText(String.valueOf(modelProdutos.getValor_uni()));
            this.jtfDescricao.setText(String.valueOf(modelProdutos.getDescricao()));
            this.jtfPeso.setText(String.valueOf(modelProdutos.getPeso()));
            this.jtfMin_Recomendado.setText(String.valueOf(modelProdutos.getMInRecomendado()));
            this.jcbCategoria.setSelectedIndex(modelProdutos.getID_categoria()-1);
            this.jcbMarca.setSelectedIndex(modelProdutos.getID_marca()-1);
        } catch (Exception e){
            JOptionPane.showMessageDialog(this, "Código inválido ou nenhum registro selecionado!", "Aviso", JOptionPane.ERROR_MESSAGE);
        }
    }//GEN-LAST:event_jbAlterarActionPerformed

    private void jbPesquisarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jbPesquisarActionPerformed
        DefaultTableModel modelo = (DefaultTableModel) this.jtableProdutos.getModel();
        TableRowSorter<TableModel> classificador = new TableRowSorter<>(modelo);
        this.jtableProdutos.setRowSorter(classificador);
        String texto = jtfPesquisar.getText();
        String[] indices = {"0", "1"}; 
        
        // Índices das colunas em que deseja pesquisar

        List<RowFilter<Object, Object>> filters = new ArrayList<>();
            for (String indice : indices) {
                filters.add(RowFilter.regexFilter(texto, Integer.parseInt(indice)));
            }
        RowFilter<Object, Object> filtro = RowFilter.orFilter(filters);
        classificador.setRowFilter(filtro);
    }//GEN-LAST:event_jbPesquisarActionPerformed

    private void jtfEstoqueActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jtfEstoqueActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jtfEstoqueActionPerformed

    private void jcbCategoriaActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jcbCategoriaActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jcbCategoriaActionPerformed

    private void jtfMin_RecomendadoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jtfMin_RecomendadoActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jtfMin_RecomendadoActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(viewProduto.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(viewProduto.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(viewProduto.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(viewProduto.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new viewProduto().setVisible(true);
            }
        });
    }
    
    private void salvarProduto(){
     // Salva um novo produto no banco
     //chamar o model categoria e o model marca
     //recuperar o id pelo nome (tem método pra isso) (controllerProdutos tem exemplos)
     //passar o id categoria e id marca no model
     //no salver produto, adiciona os caras lá e corre pro abraço
        modelProdutos.setID_produto(Integer.parseInt(this.jtfCodigo.getText()));        
        modelProdutos.setNome(this.jtfNome.getText());
        modelProdutos.setQuantidade_total(0);
        modelProdutos.setValor_uni(formatador.converterVirgulaParaPonto(this.jtfValor.getText()));
        modelProdutos.setPeso(formatador.converterVirgulaParaPonto(this.jtfPeso.getText()));
        modelProdutos.setMinRecomendado(Integer.parseInt(this.jtfMin_Recomendado.getText()));
        modelProdutos.setCategoria(this.jcbCategoria.getSelectedItem().toString());
        int id_cat = ControllerCategoria.getCategoriaController(modelProdutos.getCategoria());
        modelProdutos.setID_categoria(id_cat);
        modelProdutos.setNome_marca(this.jcbMarca.getSelectedItem().toString());
        int id_mac = ControllerMarca.getMarcaController(modelProdutos.getNome_marca());
        modelProdutos.setID_marca(id_mac);
        modelProdutos.setDescricao(this.jtfDescricao.getText());
        if(controllerProdutos.salvarProdutoController(modelProdutos)>0){
            JOptionPane.showMessageDialog(this, "Produto cadastrado com sucesso!", "ATENÇÃO", JOptionPane.WARNING_MESSAGE);
            this.carregarProdutos();
            this.limparCampos();
            this.habilitarDesabilitarCampos(false);
        }else{
            JOptionPane.showMessageDialog(this, "Erro ao cadastrar o produto!", "ERRO", JOptionPane.ERROR_MESSAGE);
        }
    }
    
    
    private void alterarProduto(){
    // Altera um novo produto no banco
        modelProdutos.setNome(this.jtfNome.getText());
        if(this.jtfEstoque.getText().equals(0.0)){
        modelProdutos.setQuantidade_total(0);
        }else{modelProdutos.setQuantidade_total(Double.parseDouble(this.jtfEstoque.getText()));}
        modelProdutos.setValor_uni(formatador.converterVirgulaParaPonto(this.jtfValor.getText()));
        modelProdutos.setPeso(formatador.converterVirgulaParaPonto(this.jtfPeso.getText()));
        modelProdutos.setMinRecomendado(Double.parseDouble(this.jtfMin_Recomendado.getText()));
        modelProdutos.setCategoria(this.jcbCategoria.getSelectedItem().toString());
        int id_cat = ControllerCategoria.getCategoriaController(modelProdutos.getCategoria());
        modelProdutos.setID_categoria(id_cat);
        modelProdutos.setNome_marca(this.jcbMarca.getSelectedItem().toString());
        int id_mac = ControllerMarca.getMarcaController(modelProdutos.getNome_marca());
        modelProdutos.setID_marca(id_mac);
        modelProdutos.setDescricao(this.jtfDescricao.getText());
        if(controllerProdutos.alterarProdutoController(modelProdutos)){
            JOptionPane.showMessageDialog(this, "Produto alterado com sucesso!", "ATENÇÃO", JOptionPane.WARNING_MESSAGE);
            this.carregarProdutos();
            this.limparCampos();
            this.habilitarDesabilitarCampos(false);
        }else{
            JOptionPane.showMessageDialog(this, "Erro ao alterar o produto!", "ERRO", JOptionPane.ERROR_MESSAGE);
        }
    }
    /**
     * Habilitar e desabilitar os campos de formulário
     * @param condicao 
     */
    private void habilitarDesabilitarCampos(boolean condicao){
        jtfCodigo.setEnabled(false);
        jtfNome.setEnabled(condicao);
        jtfEstoque.setEnabled(false);
        jtfValor.setEnabled(condicao);
        jtfPeso.setEnabled(condicao);
        jtfDescricao.setEnabled(condicao);
        jtfMin_Recomendado.setEnabled(condicao);
        jcbCategoria.setEnabled(condicao);
        jcbMarca.setEnabled(condicao);
        jbSalvar.setEnabled(condicao);
    }
    private void habilitarCampos(boolean condicao){
        jtfCodigo.setEnabled(condicao);
        jtfNome.setEnabled(condicao);
        jtfEstoque.setEnabled(false);
        jtfValor.setEnabled(condicao);
        jtfPeso.setEnabled(condicao);
        jtfDescricao.setEnabled(condicao);
        jtfMin_Recomendado.setEnabled(condicao);
        jcbCategoria.setEnabled(condicao);
        jcbMarca.setEnabled(condicao);
        jbSalvar.setEnabled(condicao);
    }
    
    /**
     * Limpar os campos do formulário
     */
    private void limparCampos(){
        jtfCodigo.setText("");
        jtfNome.setText("");
        jtfEstoque.setText("");
        jtfMin_Recomendado.setText("");
        jtfValor.setText("");
        jtfPeso.setText("");
        jtfDescricao.setText("");
        jcbCategoria.setSelectedItem(accessibleContext);
        jcbMarca.setSelectedItem(accessibleContext);
    }
    
    /**
     * Preenche a tabela de produtos com os produtos cadastrados no banco
     */
    private void carregarProdutos(){
        listaModelProdutos = controllerProdutos.retornarListaProdutoController();
        DefaultTableModel modelo = (DefaultTableModel) jtableProdutos.getModel();
        modelo.setNumRows(0);
       // inserir produtos na tabela
        int cont = listaModelProdutos.size();
        for (int i = 0; i < cont; i++) {
            modelo.addRow(new Object[]{
            listaModelProdutos.get(i).getID_produto(),
            listaModelProdutos.get(i).getNome(),
            listaModelProdutos.get(i).getQuantidade_total(),
            listaModelProdutos.get(i).getValor_uni(),
            });
        }
    }
    private void carregarMarcas() {
        listaModelMarcas = controllerMarcas.getListaMarcaController();
        jcbMarca.removeAllItems(); // Limpa os itens existentes no JComboBox
        for (ModelMarca marca : listaModelMarcas) {
            jcbMarca.addItem(marca.getNome_marca());
        }
    }
    private void carregarCategorias() {
        listaModelCategorias = controllerCategoria.getListaCategoriaController();
        jcbCategoria.removeAllItems(); // Limpa os itens existentes no JComboBox
        for (ModelCategoria categorias : listaModelCategorias) {
            jcbCategoria.addItem(categorias.getCategoria());
        }
    }
    

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel11;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JButton jbAlterar;
    private javax.swing.JButton jbCancelar;
    private javax.swing.JButton jbExcluir;
    private javax.swing.JButton jbNovo;
    private javax.swing.JButton jbPesquisar;
    private javax.swing.JButton jbSalvar;
    private javax.swing.JComboBox<String> jcbCategoria;
    private javax.swing.JComboBox<String> jcbMarca;
    private javax.swing.JTable jtableProdutos;
    private javax.swing.JTextField jtfCodigo;
    private javax.swing.JTextField jtfDescricao;
    private javax.swing.JFormattedTextField jtfEstoque;
    private javax.swing.JFormattedTextField jtfMin_Recomendado;
    private javax.swing.JTextField jtfNome;
    private javax.swing.JFormattedTextField jtfPeso;
    private javax.swing.JTextField jtfPesquisar;
    private javax.swing.JFormattedTextField jtfValor;
    // End of variables declaration//GEN-END:variables
}
