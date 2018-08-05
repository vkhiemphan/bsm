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

    @Query("select sum(bsc.amount) from BuySaleRelation bsc where bsc.buyContract.id = :buyContractId and bsc.saleContract.id <> :saleContractId ")
    Long sumAmountByBuyContract(@Param("buyContractId") Long buyContractId, @Param("saleContractId") Long saleContractId);

    List<BuySaleRelation> findAllBySaleContractId(@Param("saleContractId") Long saleContractId);

    List<BuySaleRelation> findAllByBuyContractId(Long buyContractId);

    @Query("select bsr from BuySaleRelation bsr order by bsr.buyContract.id asc")
    List<BuySaleRelation> findAllByOrOrderByBuyContractAsc();
}
