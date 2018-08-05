package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.SaleContract;
import com.ant.bsm.repository.SaleContractRepository;
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
 * Test class for the SaleContractResource REST controller.
 *
 * @see SaleContractResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class SaleContractResourceIntTest {

    private static final String DEFAULT_SALE_CONTACT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SALE_CONTACT_CODE = "BBBBBBBBBB";

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
    private SaleContractRepository saleContractRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSaleContractMockMvc;

    private SaleContract saleContract;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SaleContractResource saleContractResource = new SaleContractResource(saleContractRepository);
        this.restSaleContractMockMvc = MockMvcBuilders.standaloneSetup(saleContractResource)
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
    public static SaleContract createEntity(EntityManager em) {
        SaleContract saleContract = new SaleContract()
            .saleContractCode(DEFAULT_SALE_CONTACT_CODE)
            .number(DEFAULT_NUMBER)
            .amount(DEFAULT_AMOUNT)
            .price(DEFAULT_PRICE)
            .contractDate(DEFAULT_CONTACT_DATE)
            .note(DEFAULT_NOTE)
            .status(DEFAULT_STATUS);
        return saleContract;
    }

    @Before
    public void initTest() {
        saleContract = createEntity(em);
    }

    @Test
    @Transactional
    public void createSaleContract() throws Exception {
        int databaseSizeBeforeCreate = saleContractRepository.findAll().size();

        // Create the SaleContract
        restSaleContractMockMvc.perform(post("/api/sale-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(saleContract)))
            .andExpect(status().isCreated());

        // Validate the SaleContract in the database
        List<SaleContract> saleContractList = saleContractRepository.findAll();
        assertThat(saleContractList).hasSize(databaseSizeBeforeCreate + 1);
        SaleContract testSaleContract = saleContractList.get(saleContractList.size() - 1);
        assertThat(testSaleContract.getSaleContractCode()).isEqualTo(DEFAULT_SALE_CONTACT_CODE);
        assertThat(testSaleContract.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testSaleContract.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testSaleContract.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testSaleContract.getContractDate()).isEqualTo(DEFAULT_CONTACT_DATE);
        assertThat(testSaleContract.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testSaleContract.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createSaleContractWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = saleContractRepository.findAll().size();

        // Create the SaleContract with an existing ID
        saleContract.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSaleContractMockMvc.perform(post("/api/sale-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(saleContract)))
            .andExpect(status().isBadRequest());

        // Validate the SaleContract in the database
        List<SaleContract> saleContractList = saleContractRepository.findAll();
        assertThat(saleContractList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSaleContracts() throws Exception {
        // Initialize the database
        saleContractRepository.saveAndFlush(saleContract);

        // Get all the saleContractList
        restSaleContractMockMvc.perform(get("/api/sale-contracts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(saleContract.getId().intValue())))
            .andExpect(jsonPath("$.[*].saleContractCode").value(hasItem(DEFAULT_SALE_CONTACT_CODE.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.toString())))
            .andExpect(jsonPath("$.[*].contractDate").value(hasItem(DEFAULT_CONTACT_DATE.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }


    @Test
    @Transactional
    public void getSaleContract() throws Exception {
        // Initialize the database
        saleContractRepository.saveAndFlush(saleContract);

        // Get the saleContract
        restSaleContractMockMvc.perform(get("/api/sale-contracts/{id}", saleContract.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(saleContract.getId().intValue()))
            .andExpect(jsonPath("$.saleContractCode").value(DEFAULT_SALE_CONTACT_CODE.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.toString()))
            .andExpect(jsonPath("$.contractDate").value(DEFAULT_CONTACT_DATE.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSaleContract() throws Exception {
        // Get the saleContract
        restSaleContractMockMvc.perform(get("/api/sale-contracts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSaleContract() throws Exception {
        // Initialize the database
        saleContractRepository.saveAndFlush(saleContract);

        int databaseSizeBeforeUpdate = saleContractRepository.findAll().size();

        // Update the saleContract
        SaleContract updatedSaleContract = saleContractRepository.findById(saleContract.getId()).get();
        // Disconnect from session so that the updates on updatedSaleContract are not directly saved in db
        em.detach(updatedSaleContract);
        updatedSaleContract
            .saleContractCode(UPDATED_SALE_CONTACT_CODE)
            .number(UPDATED_NUMBER)
            .amount(UPDATED_AMOUNT)
            .price(UPDATED_PRICE)
            .contractDate(UPDATED_CONTACT_DATE)
            .note(UPDATED_NOTE)
            .status(UPDATED_STATUS);

        restSaleContractMockMvc.perform(put("/api/sale-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSaleContract)))
            .andExpect(status().isOk());

        // Validate the SaleContract in the database
        List<SaleContract> saleContractList = saleContractRepository.findAll();
        assertThat(saleContractList).hasSize(databaseSizeBeforeUpdate);
        SaleContract testSaleContract = saleContractList.get(saleContractList.size() - 1);
        assertThat(testSaleContract.getSaleContractCode()).isEqualTo(UPDATED_SALE_CONTACT_CODE);
        assertThat(testSaleContract.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testSaleContract.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testSaleContract.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testSaleContract.getContractDate()).isEqualTo(UPDATED_CONTACT_DATE);
        assertThat(testSaleContract.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testSaleContract.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingSaleContract() throws Exception {
        int databaseSizeBeforeUpdate = saleContractRepository.findAll().size();

        // Create the SaleContract

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSaleContractMockMvc.perform(put("/api/sale-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(saleContract)))
            .andExpect(status().isBadRequest());

        // Validate the SaleContract in the database
        List<SaleContract> saleContractList = saleContractRepository.findAll();
        assertThat(saleContractList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSaleContract() throws Exception {
        // Initialize the database
        saleContractRepository.saveAndFlush(saleContract);

        int databaseSizeBeforeDelete = saleContractRepository.findAll().size();

        // Get the saleContract
        restSaleContractMockMvc.perform(delete("/api/sale-contracts/{id}", saleContract.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SaleContract> saleContractList = saleContractRepository.findAll();
        assertThat(saleContractList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SaleContract.class);
        SaleContract saleContract1 = new SaleContract();
        saleContract1.setId(1L);
        SaleContract saleContract2 = new SaleContract();
        saleContract2.setId(saleContract1.getId());
        assertThat(saleContract1).isEqualTo(saleContract2);
        saleContract2.setId(2L);
        assertThat(saleContract1).isNotEqualTo(saleContract2);
        saleContract1.setId(null);
        assertThat(saleContract1).isNotEqualTo(saleContract2);
    }
}
