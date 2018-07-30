package com.ant.bsm.service;

import com.ant.bsm.domain.BuyContact;
import com.ant.bsm.domain.BuySaleRelation;
import com.ant.bsm.repository.BuyContactRepository;
import com.ant.bsm.repository.BuySaleRelationRepository;
import com.ant.bsm.web.rest.dto.BuyContactWithSaleData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuySaleContractService {

    @Autowired
    public BuySaleRelationRepository buySaleRelationRepository;

    @Autowired
    public BuyContactRepository buyContactRepository;

    public List<BuyContactWithSaleData> getAllBuyContractWithSaleData() {
        List<BuyContact> buyContacts = buyContactRepository.findAll();
        if(buyContacts != null && !buyContacts.isEmpty()) {
            List<BuyContactWithSaleData> buyContactWithSaleDataList = new ArrayList<>();
            for (BuyContact buyContact: buyContacts) {
                List<BuySaleRelation> buySaleRelations = buySaleRelationRepository.findAllByBuyContactId(buyContact.getId());
                BuyContactWithSaleData buyContactWithSaleData = new BuyContactWithSaleData(buyContact, buySaleRelations);
                buyContactWithSaleDataList.add(buyContactWithSaleData);
            }
            return buyContactWithSaleDataList;
        }
        return new ArrayList<>();
    }
}
