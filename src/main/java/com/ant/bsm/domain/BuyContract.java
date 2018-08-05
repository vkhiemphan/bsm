package com.ant.bsm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A BuyContract.
 */
@Entity
@Table(name = "bsm_buy_contract")
public class BuyContract implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String buyContractCode;

    @Column(name = "number")
    private Long number;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "price")
    private String price;

    @Column(name = "contract_date")
    private LocalDate contractDate;

    @Column(name = "eta_date")
    private LocalDate etaDate;

    @Column(name = "note")
    private String note;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Provider provider;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBuyContractCode() {
        return buyContractCode;
    }

    public BuyContract buyContractCode(String buyContractCode) {
        this.buyContractCode = buyContractCode;
        return this;
    }

    public void setBuyContractCode(String buyContractCode) {
        this.buyContractCode = buyContractCode;
    }

    public Long getNumber() {
        return number;
    }

    public BuyContract number(Long number) {
        this.number = number;
        return this;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Long getAmount() {
        return amount;
    }

    public BuyContract amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getPrice() {
        return price;
    }

    public BuyContract price(String price) {
        this.price = price;
        return this;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public LocalDate getContractDate() {
        return contractDate;
    }

    public BuyContract contractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
        return this;
    }

    public void setContractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
    }

    public String getNote() {
        return note;
    }

    public BuyContract note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getStatus() {
        return status;
    }

    public BuyContract status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Product getProduct() {
        return product;
    }

    public BuyContract product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Provider getProvider() {
        return provider;
    }

    public BuyContract provider(Provider provider) {
        this.provider = provider;
        return this;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    public LocalDate getEtaDate() {
        return etaDate;
    }

    public void setEtaDate(LocalDate etaDate) {
        this.etaDate = etaDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BuyContract buyContract = (BuyContract) o;
        if (buyContract.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), buyContract.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BuyContract{" +
            "id=" + getId() +
            ", buyContractCode='" + getBuyContractCode() + "'" +
            ", number=" + getNumber() +
            ", amount=" + getAmount() +
            ", price='" + getPrice() + "'" +
            ", contractDate='" + getContractDate() + "'" +
            ", note='" + getNote() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
