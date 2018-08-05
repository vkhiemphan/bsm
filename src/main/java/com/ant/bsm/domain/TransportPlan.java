package com.ant.bsm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A TransportPlan.
 */
@Entity
@Table(name = "bsm_transport_plan")
public class TransportPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transport_date")
    private LocalDate transportDate;

    @Column(name = "transport_time")
    private Long transportTime;

    @Column(name = "amount_per_one")
    private Long amountPerOne;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TransportContractPart transportContractPart;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTransportDate() {
        return transportDate;
    }

    public TransportPlan transportDate(LocalDate transportDate) {
        this.transportDate = transportDate;
        return this;
    }

    public void setTransportDate(LocalDate transportDate) {
        this.transportDate = transportDate;
    }

    public Long getTransportTime() {
        return transportTime;
    }

    public TransportPlan transportTime(Long transportTime) {
        this.transportTime = transportTime;
        return this;
    }

    public void setTransportTime(Long transportTime) {
        this.transportTime = transportTime;
    }

    public Long getAmountPerOne() {
        return amountPerOne;
    }

    public TransportPlan amountPerOne(Long amountPerOne) {
        this.amountPerOne = amountPerOne;
        return this;
    }

    public void setAmountPerOne(Long amountPerOne) {
        this.amountPerOne = amountPerOne;
    }

    public TransportContractPart getTransportContractPart() {
        return transportContractPart;
    }

    public TransportPlan transportContractPart(TransportContractPart transportContractPart) {
        this.transportContractPart = transportContractPart;
        return this;
    }

    public void setTransportContractPart(TransportContractPart transportContractPart) {
        this.transportContractPart = transportContractPart;
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
        TransportPlan transportPlan = (TransportPlan) o;
        if (transportPlan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transportPlan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransportPlan{" +
            "id=" + getId() +
            ", transportDate='" + getTransportDate() + "'" +
            ", transportTime=" + getTransportTime() +
            ", amountPerOne=" + getAmountPerOne() +
            "}";
    }
}
