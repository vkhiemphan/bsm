package com.ant.bsm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A SaleContract.
 */
@Entity
@Table(name = "bsm_sale_contract")
public class SaleContract implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String saleContractCode;

    @Column(name = "number")
    private Long number;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "price")
    private String price;

    @Column(name = "contract_date")
    private LocalDate contractDate;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "note")
    private String note;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSaleContractCode() {
        return saleContractCode;
    }

    public SaleContract saleContractCode(String saleContractCode) {
        this.saleContractCode = saleContractCode;
        return this;
    }

    public void setSaleContractCode(String saleContractCode) {
        this.saleContractCode = saleContractCode;
    }

    public Long getNumber() {
        return number;
    }

    public SaleContract number(Long number) {
        this.number = number;
        return this;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Long getAmount() {
        return amount;
    }

    public SaleContract amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getPrice() {
        return price;
    }

    public SaleContract price(String price) {
        this.price = price;
        return this;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public LocalDate getContractDate() {
        return contractDate;
    }

    public SaleContract contractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
        return this;
    }

    public void setContractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
    }

    public String getNote() {
        return note;
    }

    public SaleContract note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getStatus() {
        return status;
    }

    public SaleContract status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Product getProduct() {
        return product;
    }

    public SaleContract product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Customer getCustomer() {
        return customer;
    }

    public SaleContract customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
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
        SaleContract saleContract = (SaleContract) o;
        if (saleContract.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), saleContract.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SaleContract{" +
            "id=" + getId() +
            ", saleContractCode='" + getSaleContractCode() + "'" +
            ", number=" + getNumber() +
            ", amount=" + getAmount() +
            ", price='" + getPrice() + "'" +
            ", contractDate='" + getContractDate() + "'" +
            ", note='" + getNote() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
