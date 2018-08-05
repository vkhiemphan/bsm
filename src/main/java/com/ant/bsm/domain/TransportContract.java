package com.ant.bsm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A TransportContract.
 */
@Entity
@Table(name = "bsm_transport_contract")
public class TransportContract implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String contractCode;

    @Column(name = "number")
    private Long contractNumber;

    @Column(name = "contract_date")
    private LocalDate contractDate;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "finish_date")
    private LocalDate finishDate;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TransportUnit transportUnit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContractCode() {
        return contractCode;
    }

    public TransportContract contractCode(String contractCode) {
        this.contractCode = contractCode;
        return this;
    }

    public void setContractCode(String contractCode) {
        this.contractCode = contractCode;
    }

    public Long getContractNumber() {
        return contractNumber;
    }

    public TransportContract contractNumber(Long contractNumber) {
        this.contractNumber = contractNumber;
        return this;
    }

    public void setContractNumber(Long contractNumber) {
        this.contractNumber = contractNumber;
    }

    public LocalDate getContractDate() {
        return contractDate;
    }

    public TransportContract contractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
        return this;
    }

    public void setContractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public TransportContract startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getFinishDate() {
        return finishDate;
    }

    public TransportContract finishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public TransportUnit getTransportUnit() {
        return transportUnit;
    }

    public TransportContract transportUnit(TransportUnit transportUnit) {
        this.transportUnit = transportUnit;
        return this;
    }

    public void setTransportUnit(TransportUnit transportUnit) {
        this.transportUnit = transportUnit;
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
        TransportContract transportContract = (TransportContract) o;
        if (transportContract.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transportContract.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransportContract{" +
            "id=" + getId() +
            ", contractCode='" + getContractCode() + "'" +
            ", contractNumber=" + getContractNumber() +
            ", contractDate='" + getContractDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            "}";
    }
}
