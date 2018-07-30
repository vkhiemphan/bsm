package com.ant.bsm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BuySaleRelation.
 */
@Entity
@Table(name = "bsm_buy_sale_relation")
public class BuySaleRelation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Long amount;

    @ManyToOne
    @JsonIgnoreProperties("")
    private BuyContact buyContact;

    @ManyToOne
    @JsonIgnoreProperties("")
    private SaleContact saleContact;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public BuySaleRelation amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public BuyContact getBuyContact() {
        return buyContact;
    }

    public BuySaleRelation buyContact(BuyContact buyContact) {
        this.buyContact = buyContact;
        return this;
    }

    public void setBuyContact(BuyContact buyContact) {
        this.buyContact = buyContact;
    }

    public SaleContact getSaleContact() {
        return saleContact;
    }

    public BuySaleRelation saleContact(SaleContact saleContact) {
        this.saleContact = saleContact;
        return this;
    }

    public void setSaleContact(SaleContact saleContact) {
        this.saleContact = saleContact;
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
        BuySaleRelation buySaleRelation = (BuySaleRelation) o;
        if (buySaleRelation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), buySaleRelation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BuySaleRelation{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            "}";
    }
}
