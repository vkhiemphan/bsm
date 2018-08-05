package com.ant.bsm.repository;

import com.ant.bsm.domain.BuyContract;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data  repository for the BuyContract entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BuyContractRepository extends JpaRepository<BuyContract, Long> {

    @Query("select bc from BuyContract bc where bc.etaDate < :etaDate")
    List<BuyContract> findForSale(@Param("etaDate") LocalDate etaDate);
}
