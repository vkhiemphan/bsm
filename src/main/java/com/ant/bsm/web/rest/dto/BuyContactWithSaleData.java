package com.ant.bsm.web.rest.dto;

import com.ant.bsm.domain.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public class BuyContactWithSaleData implements Serializable {

    private Long id;

    private String buyContactCode;

    private Long number;

    private Long amount;

    private Long remainAmount;

    private String price;

    private LocalDate contactDate;

    private LocalDate etaDate;

    private String note;

    private String status;

    private Product product;

    private Provider provider;

    private List<BuySaleRelation> buySaleRelations;

    public BuyContactWithSaleData() {
    }

    public BuyContactWithSaleData(BuyContact buyContact, List<BuySaleRelation> buySaleRelations) {
        this.id = buyContact.getId();
        this.buyContactCode = buyContact.getBuyContactCode();
        this.amount = buyContact.getAmount();
        this.contactDate = buyContact.getContactDate();
        this.etaDate = buyContact.getEtaDate();
        this.note = buyContact.getNote();
        this.number = buyContact.getNumber();
        this.price = buyContact.getPrice();
        this.product = buyContact.getProduct();
        this.provider = buyContact.getProvider();
        this.remainAmount = buyContact.getAmount();
        this.status = buyContact.getStatus();
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

    public String getBuyContactCode() {
        return buyContactCode;
    }

    public void setBuyContactCode(String buyContactCode) {
        this.buyContactCode = buyContactCode;
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

    public LocalDate getContactDate() {
        return contactDate;
    }

    public void setContactDate(LocalDate contactDate) {
        this.contactDate = contactDate;
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
