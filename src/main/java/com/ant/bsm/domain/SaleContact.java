package com.ant.bsm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A SaleContact.
 */
@Entity
@Table(name = "bsm_sale_contact")
public class SaleContact implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String saleContactCode;

    @Column(name = "number")
    private Long number;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "price")
    private String price;

    @Column(name = "contact_date")
    private LocalDate contactDate;

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

    public String getSaleContactCode() {
        return saleContactCode;
    }

    public SaleContact saleContactCode(String saleContactCode) {
        this.saleContactCode = saleContactCode;
        return this;
    }

    public void setSaleContactCode(String saleContactCode) {
        this.saleContactCode = saleContactCode;
    }

    public Long getNumber() {
        return number;
    }

    public SaleContact number(Long number) {
        this.number = number;
        return this;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Long getAmount() {
        return amount;
    }

    public SaleContact amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getPrice() {
        return price;
    }

    public SaleContact price(String price) {
        this.price = price;
        return this;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public LocalDate getContactDate() {
        return contactDate;
    }

    public SaleContact contactDate(LocalDate contactDate) {
        this.contactDate = contactDate;
        return this;
    }

    public void setContactDate(LocalDate contactDate) {
        this.contactDate = contactDate;
    }

    public String getNote() {
        return note;
    }

    public SaleContact note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getStatus() {
        return status;
    }

    public SaleContact status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Product getProduct() {
        return product;
    }

    public SaleContact product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Customer getCustomer() {
        return customer;
    }

    public SaleContact customer(Customer customer) {
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
        SaleContact saleContact = (SaleContact) o;
        if (saleContact.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), saleContact.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SaleContact{" +
            "id=" + getId() +
            ", saleContactCode='" + getSaleContactCode() + "'" +
            ", number=" + getNumber() +
            ", amount=" + getAmount() +
            ", price='" + getPrice() + "'" +
            ", contactDate='" + getContactDate() + "'" +
            ", note='" + getNote() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
