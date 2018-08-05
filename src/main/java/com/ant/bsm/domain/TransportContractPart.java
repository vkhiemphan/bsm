package com.ant.bsm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TransportContractPart.
 */
@Entity
@Table(name = "bsm_transport_contract_part")
public class TransportContractPart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private Long price;

    @Column(name = "jhi_size")
    private Long size;

    @Column(name = "distance")
    private Long distance;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "current_amount")
    private Long currentAmount;

    @ManyToOne
    @JsonIgnoreProperties("")
    private SaleContract saleContract;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TransportContract transportContract;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Position positionStart;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Position positionFinish;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrice() {
        return price;
    }

    public TransportContractPart price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getSize() {
        return size;
    }

    public TransportContractPart size(Long size) {
        this.size = size;
        return this;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public Long getDistance() {
        return distance;
    }

    public TransportContractPart distance(Long distance) {
        this.distance = distance;
        return this;
    }

    public void setDistance(Long distance) {
        this.distance = distance;
    }

    public Long getAmount() {
        return amount;
    }

    public TransportContractPart amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getCurrentAmount() {
        return currentAmount;
    }

    public TransportContractPart currentAmount(Long currentAmount) {
        this.currentAmount = currentAmount;
        return this;
    }

    public void setCurrentAmount(Long currentAmount) {
        this.currentAmount = currentAmount;
    }

    public SaleContract getSaleContract() {
        return saleContract;
    }

    public TransportContractPart saleContract(SaleContract saleContract) {
        this.saleContract = saleContract;
        return this;
    }

    public void setSaleContract(SaleContract saleContract) {
        this.saleContract = saleContract;
    }

    public TransportContract getTransportContract() {
        return transportContract;
    }

    public TransportContractPart transportContract(TransportContract transportContract) {
        this.transportContract = transportContract;
        return this;
    }

    public void setTransportContract(TransportContract transportContract) {
        this.transportContract = transportContract;
    }

    public Position getPositionStart() {
        return positionStart;
    }

    public TransportContractPart positionStart(Position position) {
        this.positionStart = position;
        return this;
    }

    public void setPositionStart(Position position) {
        this.positionStart = position;
    }

    public Position getPositionFinish() {
        return positionFinish;
    }

    public TransportContractPart positionFinish(Position position) {
        this.positionFinish = position;
        return this;
    }

    public void setPositionFinish(Position position) {
        this.positionFinish = position;
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
        TransportContractPart transportContractPart = (TransportContractPart) o;
        if (transportContractPart.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transportContractPart.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransportContractPart{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", size=" + getSize() +
            ", distance=" + getDistance() +
            ", amount=" + getAmount() +
            ", currentAmount=" + getCurrentAmount() +
            "}";
    }
}
