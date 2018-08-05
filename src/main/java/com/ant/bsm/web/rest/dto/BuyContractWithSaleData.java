package com.ant.bsm.web.rest.dto;

import com.ant.bsm.domain.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public class BuyContractWithSaleData implements Serializable {

    private Long id;

    private String buyContractCode;

    private Long number;

    private Long amount;

    private Long remainAmount;

    private String price;

    private LocalDate contractDate;

    private LocalDate etaDate;

    private String note;

    private String status;

    private Product product;

    private Provider provider;

    private List<BuySaleRelation> buySaleRelations;

    public BuyContractWithSaleData() {
    }

    public BuyContractWithSaleData(BuyContract buyContract, List<BuySaleRelation> buySaleRelations) {
        this.id = buyContract.getId();
        this.buyContractCode = buyContract.getBuyContractCode();
        this.amount = buyContract.getAmount();
        this.contractDate = buyContract.getContractDate();
        this.etaDate = buyContract.getEtaDate();
        this.note = buyContract.getNote();
        this.number = buyContract.getNumber();
        this.price = buyContract.getPrice();
        this.product = buyContract.getProduct();
        this.provider = buyContract.getProvider();
        this.remainAmount = buyContract.getAmount();
        this.status = buyContract.getStatus();
        this.buySaleRelations = buySaleRelations;
        for (BuySaleRelation buySaleRelation: buySaleRelations) {
            this.remainAmount -= buySaleRelation.getAmount();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBuyContractCode() {
        return buyContractCode;
    }

    public void setBuyContractCode(String buyContractCode) {
        this.buyContractCode = buyContractCode;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public LocalDate getContractDate() {
        return contractDate;
    }

    public void setContractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
    }

    public LocalDate getEtaDate() {
        return etaDate;
    }

    public void setEtaDate(LocalDate etaDate) {
        this.etaDate = etaDate;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Provider getProvider() {
        return provider;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    public Long getRemainAmount() {
        return remainAmount;
    }

    public void setRemainAmount(Long remainAmount) {
        this.remainAmount = remainAmount;
    }

    public List<BuySaleRelation> getBuySaleRelations() {
        return buySaleRelations;
    }

    public void setBuySaleRelations(List<BuySaleRelation> buySaleRelations) {
        this.buySaleRelations = buySaleRelations;
    }
}
