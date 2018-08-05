package com.ant.bsm.repository;

import com.ant.bsm.domain.TransportContractPart;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransportContractPart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportContractPartRepository extends JpaRepository<TransportContractPart, Long> {

}
