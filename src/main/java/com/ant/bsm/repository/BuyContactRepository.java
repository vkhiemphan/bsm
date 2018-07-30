package com.ant.bsm.repository;

import com.ant.bsm.domain.BuyContact;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data  repository for the BuyContact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BuyContactRepository extends JpaRepository<BuyContact, Long> {

    @Query("select bc from BuyContact bc where bc.etaDate < :etaDate")
    List<BuyContact> findForSale(@Param("etaDate") LocalDate etaDate);
}
