package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.BuyContract;
import com.ant.bsm.repository.BuyContractRepository;
import com.ant.bsm.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.ant.bsm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BuyContractResource REST controller.
 *
 * @see BuyContractResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class BuyContractResourceIntTest {

    private static final String DEFAULT_BUY_CONTACT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_BUY_CONTACT_CODE = "BBBBBBBBBB";

    private static final Long DEFAULT_NUMBER = 1L;
    private static final Long UPDATED_NUMBER = 2L;

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final String DEFAULT_PRICE = "AAAAAAAAAA";
    private static final String UPDATED_PRICE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CONTACT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CONTACT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private BuyContractRepository buyContractRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBuyContractMockMvc;

    private BuyContract buyContract;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BuyContractResource buyContractResource = new BuyContractResource(buyContractRepository);
        this.restBuyContractMockMvc = MockMvcBuilders.standaloneSetup(buyContractResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BuyContract createEntity(EntityManager em) {
        BuyContract buyContract = new BuyContract()
            .buyContractCode(DEFAULT_BUY_CONTACT_CODE)
            .number(DEFAULT_NUMBER)
            .amount(DEFAULT_AMOUNT)
            .price(DEFAULT_PRICE)
            .contractDate(DEFAULT_CONTACT_DATE)
            .note(DEFAULT_NOTE)
            .status(DEFAULT_STATUS);
        return buyContract;
    }

    @Before
    public void initTest() {
        buyContract = createEntity(em);
    }

    @Test
    @Transactional
    public void createBuyContract() throws Exception {
        int databaseSizeBeforeCreate = buyContractRepository.findAll().size();

        // Create the BuyContract
        restBuyContractMockMvc.perform(post("/api/buy-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buyContract)))
            .andExpect(status().isCreated());

        // Validate the BuyContract in the database
        List<BuyContract> buyContractList = buyContractRepository.findAll();
        assertThat(buyContractList).hasSize(databaseSizeBeforeCreate + 1);
        BuyContract testBuyContract = buyContractList.get(buyContractList.size() - 1);
        assertThat(testBuyContract.getBuyContractCode()).isEqualTo(DEFAULT_BUY_CONTACT_CODE);
        assertThat(testBuyContract.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testBuyContract.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testBuyContract.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testBuyContract.getContractDate()).isEqualTo(DEFAULT_CONTACT_DATE);
        assertThat(testBuyContract.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testBuyContract.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createBuyContractWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = buyContractRepository.findAll().size();

        // Create the BuyContract with an existing ID
        buyContract.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBuyContractMockMvc.perform(post("/api/buy-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buyContract)))
            .andExpect(status().isBadRequest());

        // Validate the BuyContract in the database
        List<BuyContract> buyContractList = buyContractRepository.findAll();
        assertThat(buyContractList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBuyContracts() throws Exception {
        // Initialize the database
        buyContractRepository.saveAndFlush(buyContract);

        // Get all the buyContractList
        restBuyContractMockMvc.perform(get("/api/buy-contracts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(buyContract.getId().intValue())))
            .andExpect(jsonPath("$.[*].buyContractCode").value(hasItem(DEFAULT_BUY_CONTACT_CODE.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.toString())))
            .andExpect(jsonPath("$.[*].contractDate").value(hasItem(DEFAULT_CONTACT_DATE.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }


    @Test
    @Transactional
    public void getBuyContract() throws Exception {
        // Initialize the database
        buyContractRepository.saveAndFlush(buyContract);

        // Get the buyContract
        restBuyContractMockMvc.perform(get("/api/buy-contracts/{id}", buyContract.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(buyContract.getId().intValue()))
            .andExpect(jsonPath("$.buyContractCode").value(DEFAULT_BUY_CONTACT_CODE.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.toString()))
            .andExpect(jsonPath("$.contractDate").value(DEFAULT_CONTACT_DATE.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBuyContract() throws Exception {
        // Get the buyContract
        restBuyContractMockMvc.perform(get("/api/buy-contracts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBuyContract() throws Exception {
        // Initialize the database
        buyContractRepository.saveAndFlush(buyContract);

        int databaseSizeBeforeUpdate = buyContractRepository.findAll().size();

        // Update the buyContract
        BuyContract updatedBuyContract = buyContractRepository.findById(buyContract.getId()).get();
        // Disconnect from session so that the updates on updatedBuyContract are not directly saved in db
        em.detach(updatedBuyContract);
        updatedBuyContract
            .buyContractCode(UPDATED_BUY_CONTACT_CODE)
            .number(UPDATED_NUMBER)
            .amount(UPDATED_AMOUNT)
            .price(UPDATED_PRICE)
            .contractDate(UPDATED_CONTACT_DATE)
            .note(UPDATED_NOTE)
            .status(UPDATED_STATUS);

        restBuyContractMockMvc.perform(put("/api/buy-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBuyContract)))
            .andExpect(status().isOk());

        // Validate the BuyContract in the database
        List<BuyContract> buyContractList = buyContractRepository.findAll();
        assertThat(buyContractList).hasSize(databaseSizeBeforeUpdate);
        BuyContract testBuyContract = buyContractList.get(buyContractList.size() - 1);
        assertThat(testBuyContract.getBuyContractCode()).isEqualTo(UPDATED_BUY_CONTACT_CODE);
        assertThat(testBuyContract.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testBuyContract.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testBuyContract.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testBuyContract.getContractDate()).isEqualTo(UPDATED_CONTACT_DATE);
        assertThat(testBuyContract.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testBuyContract.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingBuyContract() throws Exception {
        int databaseSizeBeforeUpdate = buyContractRepository.findAll().size();

        // Create the BuyContract

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBuyContractMockMvc.perform(put("/api/buy-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buyContract)))
            .andExpect(status().isBadRequest());

        // Validate the BuyContract in the database
        List<BuyContract> buyContractList = buyContractRepository.findAll();
        assertThat(buyContractList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBuyContract() throws Exception {
        // Initialize the database
        buyContractRepository.saveAndFlush(buyContract);

        int databaseSizeBeforeDelete = buyContractRepository.findAll().size();

        // Get the buyContract
        restBuyContractMockMvc.perform(delete("/api/buy-contracts/{id}", buyContract.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BuyContract> buyContractList = buyContractRepository.findAll();
        assertThat(buyContractList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BuyContract.class);
        BuyContract buyContract1 = new BuyContract();
        buyContract1.setId(1L);
        BuyContract buyContract2 = new BuyContract();
        buyContract2.setId(buyContract1.getId());
        assertThat(buyContract1).isEqualTo(buyContract2);
        buyContract2.setId(2L);
        assertThat(buyContract1).isNotEqualTo(buyContract2);
        buyContract1.setId(null);
        assertThat(buyContract1).isNotEqualTo(buyContract2);
    }
}
