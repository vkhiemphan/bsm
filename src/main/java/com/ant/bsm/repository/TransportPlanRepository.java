package com.ant.bsm.repository;

import com.ant.bsm.domain.TransportPlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransportPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportPlanRepository extends JpaRepository<TransportPlan, Long> {

}
