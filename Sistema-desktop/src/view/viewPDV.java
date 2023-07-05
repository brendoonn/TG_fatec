/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import controller.ControllerEmpresa;
import controller.ControllerProdutos;
import controller.ControllerVendas;
import controller.ControllerVendasProdutos;
import java.awt.Image;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.ImageIcon;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;
import model.ModelEmpresa;
import model.ModelProdutos;
import model.ModelSessaoUsuario;
import model.ModelVendas;
import model.ModelVendasProdutos;
import util.BLDatas;
import util.Imprimir;

/**
 *
 * @author andre
 */
public class viewPDV extends javax.swing.JFrame {

    ControllerProdutos controllerProdutos = new ControllerProdutos();
    ModelProdutos modelProdutos = new ModelProdutos();
    ModelVendas modelVendas = new ModelVendas();
    ArrayList<ModelProdutos> listaModelProdutos = new ArrayList<>();
    ModelVendasProdutos modelVendasProdutos = new ModelVendasProdutos();
    ArrayList<ModelVendasProdutos> listaModelVendasProdutos = new ArrayList<>();
    BLDatas bLDatas = new BLDatas();
    ControllerVendas controllerVendas = new ControllerVendas();
    ControllerVendasProdutos controllerVendasProdutos = new ControllerVendasProdutos();
    ModelSessaoUsuario modelSessaoUsuario = new ModelSessaoUsuario();
    private ViewPagamentoPDV viewPagamentoPDV;
    int quantidade;
    ControllerEmpresa controllerEmpresa = new ControllerEmpresa();
    ModelEmpresa modelEmpresa = new ModelEmpresa();
    

    /**
     * Creates new form viewPDV
     */
    public viewPDV() throws MalformedURLException {
        initComponents();
        setLocationRelativeTo(null);
        quantidade = 1;
        setarOperador();
        limparTela();
        jtfCodigoProduto.requestFocus();
        carregarLogo();

    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        jlLogo = new javax.swing.JLabel();
        jPanel2 = new javax.swing.JPanel();
        jPanel4 = new javax.swing.JPanel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        jlOperador = new javax.swing.JLabel();
        jlStatus = new javax.swing.JLabel();
        jPanel5 = new javax.swing.JPanel();
        jLabel8 = new javax.swing.JLabel();
        jtfValorBruto = new javax.swing.JTextField();
        jLabel9 = new javax.swing.JLabel();
        jLabel10 = new javax.swing.JLabel();
        jLabel11 = new javax.swing.JLabel();
        jLabel12 = new javax.swing.JLabel();
        jLabel13 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        jPanel3 = new javax.swing.JPanel();
        jScrollPane1 = new javax.swing.JScrollPane();
        jtProdutos = new javax.swing.JTable();
        jtfCodigoProduto = new javax.swing.JFormattedTextField();
        jMenuBar1 = new javax.swing.JMenuBar();
        jMenu1 = new javax.swing.JMenu();
        jMenuItem1 = new javax.swing.JMenuItem();
        jMenu2 = new javax.swing.JMenu();
        jmiExcluir = new javax.swing.JMenuItem();
        jmiAddQuantidade = new javax.swing.JMenuItem();
        jmiVenda = new javax.swing.JMenuItem();
        jMenuItem4 = new javax.swing.JMenuItem();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setTitle("PDV");

        jPanel1.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jlLogo.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jPanel1.add(jlLogo, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 410, 190));

        jLabel2.setFont(new java.awt.Font("Tahoma", 0, 18)); // NOI18N
        jLabel2.setText("Caixa:");

        jLabel3.setFont(new java.awt.Font("Tahoma", 0, 18)); // NOI18N
        jLabel3.setText("Operador:");

        jLabel6.setFont(new java.awt.Font("Tahoma", 0, 18)); // NOI18N
        jLabel6.setText("Status:");

        jLabel4.setFont(new java.awt.Font("Tahoma", 0, 24)); // NOI18N
        jLabel4.setText("01");

        jlOperador.setFont(new java.awt.Font("Tahoma", 0, 18)); // NOI18N
        jlOperador.setText("Operador");

        jlStatus.setFont(new java.awt.Font("Tahoma", 0, 18)); // NOI18N
        jlStatus.setText("jLabel7");

        javax.swing.GroupLayout jPanel4Layout = new javax.swing.GroupLayout(jPanel4);
        jPanel4.setLayout(jPanel4Layout);
        jPanel4Layout.setHorizontalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel6)
                    .addComponent(jLabel2)
                    .addComponent(jLabel3))
                .addGap(23, 23, 23)
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jlOperador)
                    .addComponent(jLabel4)
                    .addComponent(jlStatus))
                .addContainerGap(137, Short.MAX_VALUE))
        );
        jPanel4Layout.setVerticalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel2)
                    .addComponent(jLabel4))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel3)
                    .addComponent(jlOperador))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel6)
                    .addComponent(jlStatus))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        jLabel8.setFont(new java.awt.Font("Tahoma", 0, 18)); // NOI18N
        jLabel8.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel8.setText("Valor Bruto");

        jtfValorBruto.setEditable(false);

        jLabel9.setFont(new java.awt.Font("Tahoma", 0, 18)); // NOI18N
        jLabel9.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel9.setText("Comandos");

        jLabel10.setText("F3 Quantidade");

        jLabel11.setText("F4 Finalizar Venda");

        jLabel12.setText("F5 Pesquisar Produto");

        jLabel13.setText("F6 Sair");

        jLabel5.setText("F2 Excluir");

        javax.swing.GroupLayout jPanel5Layout = new javax.swing.GroupLayout(jPanel5);
        jPanel5.setLayout(jPanel5Layout);
        jPanel5Layout.setHorizontalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jtfValorBruto)
                    .addComponent(jLabel8, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addGroup(jPanel5Layout.createSequentialGroup()
                        .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel11)
                            .addComponent(jLabel12)
                            .addComponent(jLabel10)
                            .addComponent(jLabel13)
                            .addComponent(jLabel5))
                        .addGap(0, 0, Short.MAX_VALUE))
                    .addComponent(jLabel9, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );
        jPanel5Layout.setVerticalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addGap(5, 5, 5)
                .addComponent(jLabel8)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jtfValorBruto, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(jLabel9)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel5)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jLabel10)
                .addGap(18, 18, 18)
                .addComponent(jLabel11)
                .addGap(18, 18, 18)
                .addComponent(jLabel12)
                .addGap(18, 18, 18)
                .addComponent(jLabel13)
                .addContainerGap(161, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jPanel4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel5, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jPanel5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );

        jtProdutos.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {

            },
            new String [] {
                "Item", "Código", "Nome", "Quant.", "Valor Unit.", "Valor Total"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        jScrollPane1.setViewportView(jtProdutos);
        if (jtProdutos.getColumnModel().getColumnCount() > 0) {
            jtProdutos.getColumnModel().getColumn(0).setPreferredWidth(20);
            jtProdutos.getColumnModel().getColumn(1).setPreferredWidth(20);
            jtProdutos.getColumnModel().getColumn(2).setPreferredWidth(300);
            jtProdutos.getColumnModel().getColumn(3).setPreferredWidth(10);
            jtProdutos.getColumnModel().getColumn(4).setPreferredWidth(40);
            jtProdutos.getColumnModel().getColumn(5).setPreferredWidth(40);
        }

        jtfCodigoProduto.setFormatterFactory(new javax.swing.text.DefaultFormatterFactory(new javax.swing.text.NumberFormatter(new java.text.DecimalFormat("#0"))));
        jtfCodigoProduto.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jtfCodigoProdutoActionPerformed(evt);
            }
        });
        jtfCodigoProduto.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyReleased(java.awt.event.KeyEvent evt) {
                jtfCodigoProdutoKeyReleased(evt);
            }
        });

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 720, Short.MAX_VALUE)
                    .addComponent(jtfCodigoProduto))
                .addContainerGap())
        );
        jPanel3Layout.setVerticalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jtfCodigoProduto, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );

        jMenu1.setText("Arquivo");

        jMenuItem1.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_F6, 0));
        jMenuItem1.setText("Sair");
        jMenuItem1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenuItem1ActionPerformed(evt);
            }
        });
        jMenu1.add(jMenuItem1);

        jMenuBar1.add(jMenu1);

        jMenu2.setText("Comandos");

        jmiExcluir.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_F2, 0));
        jmiExcluir.setText("Excluir");
        jmiExcluir.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jmiExcluirActionPerformed(evt);
            }
        });
        jMenu2.add(jmiExcluir);

        jmiAddQuantidade.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_F3, 0));
        jmiAddQuantidade.setText("Quantidade");
        jmiAddQuantidade.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jmiAddQuantidadeActionPerformed(evt);
            }
        });
        jMenu2.add(jmiAddQuantidade);

        jmiVenda.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_F4, 0));
        jmiVenda.setText("Finalizar Venda");
        jmiVenda.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jmiVendaActionPerformed(evt);
            }
        });
        jMenu2.add(jmiVenda);

        jMenuItem4.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_F5, 0));
        jMenuItem4.setText("Pesquisar Produtos");
        jMenu2.add(jMenuItem4);

        jMenuBar1.add(jMenu2);

        setJMenuBar(jMenuBar1);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jPanel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addGap(18, 18, 18))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(128, 128, 128)
                        .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(16, 16, 16))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(15, 15, 15)
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, 195, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jPanel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
            .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jmiVendaActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jmiVendaActionPerformed
        // TODO add your handling code here:
        try {
            this.viewPagamentoPDV = new ViewPagamentoPDV(this, true);
            viewPagamentoPDV.setValorTotal((float) Double.parseDouble(jtfValorBruto.getText()));
            viewPagamentoPDV.setTextFieldValorTotal();
            viewPagamentoPDV.setVisible(true);

            if (viewPagamentoPDV.isPago()) {
                salvarVenda();
            } else {
                JOptionPane.showMessageDialog(this, "Pagamento cancelado!");
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Você deve incluir um produto!");
        }
    }//GEN-LAST:event_jmiVendaActionPerformed

    private void jmiAddQuantidadeActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jmiAddQuantidadeActionPerformed
        // TODO add your handling code here:
        quantidade = Integer.parseInt(JOptionPane.showInputDialog("Informe a quantidade!"));
    }//GEN-LAST:event_jmiAddQuantidadeActionPerformed

    private void jMenuItem1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenuItem1ActionPerformed
        // TODO add your handling code here:
        dispose();
    }//GEN-LAST:event_jMenuItem1ActionPerformed

    private void jmiExcluirActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jmiExcluirActionPerformed
        // TODO add your handling code here:
        int quantiLinha = jtProdutos.getRowCount();
        if (quantiLinha < 1) {
            JOptionPane.showMessageDialog(this, "Não foi adcionado nenhum item");
        } else {
            DefaultTableModel modelo = (DefaultTableModel) jtProdutos.getModel();
            int linha = Integer.parseInt(JOptionPane.showInputDialog("Informe o ítem que deseja excluir!"));
            modelo.removeRow(linha - 1);
            jtfValorBruto.setText(somaValorTotal() + "");
            for (int i = 0; i < quantiLinha - 1; i++) {
                modelo.setValueAt(i + 1, i, 0);
            }
        }
    }//GEN-LAST:event_jmiExcluirActionPerformed

    private void jtfCodigoProdutoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jtfCodigoProdutoActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jtfCodigoProdutoActionPerformed

    private void jtfCodigoProdutoKeyReleased(java.awt.event.KeyEvent evt) {//GEN-FIRST:event_jtfCodigoProdutoKeyReleased
        pegarConteudo(evt);
    }//GEN-LAST:event_jtfCodigoProdutoKeyReleased



    
    private void salvarVenda() {
        int cont;
        int codigoProduto = 0, codigoVenda = 0;
        double desconto = 0;
        modelVendas = new ModelVendas();
        try {
            modelVendas.setDataVenda(bLDatas.converterDataParaDateUS(new java.util.Date(System.currentTimeMillis())));
        } catch (Exception ex) {
            Logger.getLogger(viewPDV.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        //salvar venda
        modelVendas.setFk_pessoa(0);
        modelVendas.setVenValorLiquido(viewPagamentoPDV.getValorTotal());
        modelVendas.setVenValorBruto(Double.parseDouble(jtfValorBruto.getText()));
        modelVendas.setVenDesconto(viewPagamentoPDV.getDesconto());
        modelVendas.setFK_forma_pagamento(viewPagamentoPDV.getID_FormaPagamento());
        modelVendas.setForma_pagamento(viewPagamentoPDV.getFormaPagamento());
        codigoVenda = controllerVendas.salvarVendasProdutosDAO(modelVendas);
        cont = jtProdutos.getRowCount();
        for (int i = 0; i < cont; i++) {
            codigoProduto = (int) jtProdutos.getValueAt(i, 1);
            modelVendasProdutos = new ModelVendasProdutos();
            modelProdutos = new ModelProdutos();
            modelVendasProdutos.setFK_Produto(codigoProduto);
            modelVendasProdutos.setFK_Vendas(codigoVenda);
            modelVendasProdutos.setValor((double) jtProdutos.getValueAt(i, 4));
            modelVendasProdutos.setQuantidade(Integer.parseInt(jtProdutos.getValueAt(i, 3).toString()));
            //produto
            modelProdutos.setID_produto(codigoProduto);
            modelProdutos.setQuantidade_total(controllerProdutos.retornarProdutoController(codigoProduto).getQuantidade_total()
                    - Integer.parseInt(jtProdutos.getValueAt(i, 3).toString()));
            listaModelVendasProdutos.add(modelVendasProdutos);
            listaModelProdutos.add(modelProdutos);           
            //modelProdutos.setNome(controllerProdutos.retornarProdutoController(codigoProduto).getNome());

        }
        //salvar os produtos da venda
        if (controllerVendasProdutos.salvarVendasProdutosController(listaModelVendasProdutos)) {
            JOptionPane.showMessageDialog(this, "Venda salva com sucesso!", "ATENÇÃO", JOptionPane.WARNING_MESSAGE);
            //imprimir cupom
            limparTela();
            Imprimir imprimir = new Imprimir();
            imprimir.imprimirCupom(listaModelVendasProdutos, modelVendas);
            
        } else {
            JOptionPane.showMessageDialog(this, "Erro ao salvar a venda!", "ERRO", JOptionPane.ERROR_MESSAGE);
            limparTela();
        }
    }

    /**
     * Efetuar a limpeza da tela após concluir venda
     */
    private void limparTela() {
        jtfValorBruto.setText("");
        DefaultTableModel modelo = (DefaultTableModel) jtProdutos.getModel();
        modelo.setNumRows(0);
        jlStatus.setText("Caixa livre");
    }

    private void pegarConteudo(java.awt.event.KeyEvent e) {
        jlStatus.setText("Caixa em uso");
        DefaultTableModel modelo = (DefaultTableModel) jtProdutos.getModel();
        if (e.getKeyCode() == java.awt.event.KeyEvent.VK_ENTER) {
            try {
                modelProdutos = controllerProdutos.retornarProdutoController(Integer.parseInt(jtfCodigoProduto.getText()));
                modelo.addRow(new Object[]{
                    modelo.getRowCount() + 1,
                    modelProdutos.getID_produto(),
                    modelProdutos.getNome(),
                    quantidade,
                    modelProdutos.getValor_uni(),
                    modelProdutos.getValor_uni()* quantidade
                });
                jtfValorBruto.setText(somaValorTotal() + "");
                jtfCodigoProduto.setText("");
                quantidade = 1;
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Produto inválido");
            }
        }
    }

    private float somaValorTotal() {
        float soma = 0;
        float valor = 0;
        int cont = jtProdutos.getRowCount();

        for (int i = 0; i < cont; i++) {
            valor = Float.parseFloat(String.valueOf(jtProdutos.getValueAt(i, 5)));
            soma += valor;
        }
        return soma;
    }

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
            java.util.logging.Logger.getLogger(viewPDV.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(viewPDV.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(viewPDV.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(viewPDV.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    new viewPDV().setVisible(true);
                } catch (MalformedURLException ex) {
                    Logger.getLogger(viewPDV.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });
    }

    private void setarOperador() {
        jlOperador.setText(modelSessaoUsuario.nome);
    }
    
     private void carregarLogo() throws MalformedURLException{
        modelEmpresa = controllerEmpresa.getEmpresaController(1);
        String imagem = "http://localhost:3001/getdataimage/sistema/" + modelEmpresa.getEmp_logomarca_claro();
        URL imagemUrl = new URL(imagem);
        ImageIcon imagemLogo = new ImageIcon(imagemUrl); 
        Image imageA = imagemLogo.getImage(); 
        Image newimgA = imageA.getScaledInstance(jlLogo.getWidth(), jlLogo.getHeight(), Image.SCALE_DEFAULT); 
        imagemLogo = new ImageIcon(newimgA);  
        jlLogo.setIcon(imagemLogo);
        
    } 


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel11;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel13;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JMenu jMenu1;
    private javax.swing.JMenu jMenu2;
    private javax.swing.JMenuBar jMenuBar1;
    private javax.swing.JMenuItem jMenuItem1;
    private javax.swing.JMenuItem jMenuItem4;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel3;
    private javax.swing.JPanel jPanel4;
    private javax.swing.JPanel jPanel5;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JLabel jlLogo;
    private javax.swing.JLabel jlOperador;
    private javax.swing.JLabel jlStatus;
    private javax.swing.JMenuItem jmiAddQuantidade;
    private javax.swing.JMenuItem jmiExcluir;
    private javax.swing.JMenuItem jmiVenda;
    private javax.swing.JTable jtProdutos;
    private javax.swing.JFormattedTextField jtfCodigoProduto;
    private javax.swing.JTextField jtfValorBruto;
    // End of variables declaration//GEN-END:variables
}