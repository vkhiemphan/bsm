package com.ant.bsm.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Position.
 */
@Entity
@Table(name = "bsm_position")
public class Position implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String positionCode;

    @Column(name = "name")
    private String name;

    @Column(name = "note")
    private String note;

    @Column(name = "address")
    private String address;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPositionCode() {
        return positionCode;
    }

    public Position positionCode(String positionCode) {
        this.positionCode = positionCode;
        return this;
    }

    public void setPositionCode(String positionCode) {
        this.positionCode = positionCode;
    }

    public String getName() {
        return name;
    }

    public Position name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNote() {
        return note;
    }

    public Position note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getAddress() {
        return address;
    }

    public Position address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
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
        Position position = (Position) o;
        if (position.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), position.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Position{" +
            "id=" + getId() +
            ", positionCode='" + getPositionCode() + "'" +
            ", name='" + getName() + "'" +
            ", note='" + getNote() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
