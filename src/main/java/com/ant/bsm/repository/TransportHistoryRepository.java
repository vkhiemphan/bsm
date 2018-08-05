package com.ant.bsm.repository;

import com.ant.bsm.domain.TransportHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransportHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportHistoryRepository extends JpaRepository<TransportHistory, Long> {

}
