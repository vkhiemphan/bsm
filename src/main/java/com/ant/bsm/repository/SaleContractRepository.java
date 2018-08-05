package com.ant.bsm.repository;

import com.ant.bsm.domain.SaleContract;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SaleContract entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SaleContractRepository extends JpaRepository<SaleContract, Long> {

}
