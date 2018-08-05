package com.ant.bsm.repository;

import com.ant.bsm.domain.TransportUnit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransportUnit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportUnitRepository extends JpaRepository<TransportUnit, Long> {

}
