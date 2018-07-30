package com.ant.bsm.repository;

import com.ant.bsm.domain.SaleContact;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SaleContact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SaleContactRepository extends JpaRepository<SaleContact, Long> {

}
