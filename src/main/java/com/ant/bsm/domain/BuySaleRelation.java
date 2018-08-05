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
    private BuyContract buyContract;

    @ManyToOne
    @JsonIgnoreProperties("")
    private SaleContract saleContract;

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

    public BuyContract getBuyContract() {
        return buyContract;
    }

    public BuySaleRelation buyContract(BuyContract buyContract) {
        this.buyContract = buyContract;
        return this;
    }

    public void setBuyContract(BuyContract buyContract) {
        this.buyContract = buyContract;
    }

    public SaleContract getSaleContract() {
        return saleContract;
    }

    public BuySaleRelation saleContract(SaleContract saleContract) {
        this.saleContract = saleContract;
        return this;
    }

    public void setSaleContract(SaleContract saleContract) {
        this.saleContract = saleContract;
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
