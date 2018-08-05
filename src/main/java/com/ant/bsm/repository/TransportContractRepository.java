package com.ant.bsm.repository;

import com.ant.bsm.domain.TransportContract;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransportContract entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportContractRepository extends JpaRepository<TransportContract, Long> {

}
