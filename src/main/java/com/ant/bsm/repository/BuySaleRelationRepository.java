package com.ant.bsm.repository;

import com.ant.bsm.domain.BuySaleRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the BuySaleRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BuySaleRelationRepository extends JpaRepository<BuySaleRelation, Long> {

    @Query("select sum(bsc.amount) from BuySaleRelation bsc where bsc.buyContact.id = :buyContactId and bsc.saleContact.id <> :saleContactId ")
    Long sumAmountByBuyContact(@Param("buyContactId") Long buyContactId, @Param("saleContactId") Long saleContactId);

    List<BuySaleRelation> findAllBySaleContactId(@Param("saleContactId") Long saleContactId);

    List<BuySaleRelation> findAllByBuyContactId(Long buyContactId);

    @Query("select bsr from BuySaleRelation bsr order by bsr.buyContact.id asc")
    List<BuySaleRelation> findAllByOrOrderByBuyContactAsc();
}
