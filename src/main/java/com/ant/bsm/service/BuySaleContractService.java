package com.ant.bsm.service;

import com.ant.bsm.domain.BuyContract;
import com.ant.bsm.domain.BuySaleRelation;
import com.ant.bsm.repository.BuyContractRepository;
import com.ant.bsm.repository.BuySaleRelationRepository;
import com.ant.bsm.web.rest.dto.BuyContractWithSaleData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuySaleContractService {

    @Autowired
    public BuySaleRelationRepository buySaleRelationRepository;

    @Autowired
    public BuyContractRepository buyContractRepository;

    public List<BuyContractWithSaleData> getAllBuyContractWithSaleData() {
        List<BuyContract> buyContracts = buyContractRepository.findAll();
        if(buyContracts != null && !buyContracts.isEmpty()) {
            List<BuyContractWithSaleData> buyContractWithSaleDataList = new ArrayList<>();
            for (BuyContract buyContract : buyContracts) {
                List<BuySaleRelation> buySaleRelations = buySaleRelationRepository.findAllByBuyContractId(buyContract.getId());
                BuyContractWithSaleData buyContractWithSaleData = new BuyContractWithSaleData(buyContract, buySaleRelations);
                buyContractWithSaleDataList.add(buyContractWithSaleData);
            }
            return buyContractWithSaleDataList;
        }
        return new ArrayList<>();
    }
}
