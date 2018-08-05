package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.TransportContract;
import com.ant.bsm.repository.TransportContractRepository;
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
 * Test class for the TransportContractResource REST controller.
 *
 * @see TransportContractResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class TransportContractResourceIntTest {

    private static final String DEFAULT_CONTRACT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CONTRACT_CODE = "BBBBBBBBBB";

    private static final Long DEFAULT_CONTRACT_NUMBER = 1L;
    private static final Long UPDATED_CONTRACT_NUMBER = 2L;

    private static final LocalDate DEFAULT_CONTRACT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CONTRACT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FINISH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FINISH_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TransportContractRepository transportContractRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransportContractMockMvc;

    private TransportContract transportContract;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransportContractResource transportContractResource = new TransportContractResource(transportContractRepository);
        this.restTransportContractMockMvc = MockMvcBuilders.standaloneSetup(transportContractResource)
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
    public static TransportContract createEntity(EntityManager em) {
        TransportContract transportContract = new TransportContract()
            .contractCode(DEFAULT_CONTRACT_CODE)
            .contractNumber(DEFAULT_CONTRACT_NUMBER)
            .contractDate(DEFAULT_CONTRACT_DATE)
            .startDate(DEFAULT_START_DATE)
            .finishDate(DEFAULT_FINISH_DATE);
        return transportContract;
    }

    @Before
    public void initTest() {
        transportContract = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransportContract() throws Exception {
        int databaseSizeBeforeCreate = transportContractRepository.findAll().size();

        // Create the TransportContract
        restTransportContractMockMvc.perform(post("/api/transport-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportContract)))
            .andExpect(status().isCreated());

        // Validate the TransportContract in the database
        List<TransportContract> transportContractList = transportContractRepository.findAll();
        assertThat(transportContractList).hasSize(databaseSizeBeforeCreate + 1);
        TransportContract testTransportContract = transportContractList.get(transportContractList.size() - 1);
        assertThat(testTransportContract.getContractCode()).isEqualTo(DEFAULT_CONTRACT_CODE);
        assertThat(testTransportContract.getContractNumber()).isEqualTo(DEFAULT_CONTRACT_NUMBER);
        assertThat(testTransportContract.getContractDate()).isEqualTo(DEFAULT_CONTRACT_DATE);
        assertThat(testTransportContract.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testTransportContract.getFinishDate()).isEqualTo(DEFAULT_FINISH_DATE);
    }

    @Test
    @Transactional
    public void createTransportContractWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportContractRepository.findAll().size();

        // Create the TransportContract with an existing ID
        transportContract.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportContractMockMvc.perform(post("/api/transport-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportContract)))
            .andExpect(status().isBadRequest());

        // Validate the TransportContract in the database
        List<TransportContract> transportContractList = transportContractRepository.findAll();
        assertThat(transportContractList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransportContracts() throws Exception {
        // Initialize the database
        transportContractRepository.saveAndFlush(transportContract);

        // Get all the transportContractList
        restTransportContractMockMvc.perform(get("/api/transport-contracts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportContract.getId().intValue())))
            .andExpect(jsonPath("$.[*].contractCode").value(hasItem(DEFAULT_CONTRACT_CODE.toString())))
            .andExpect(jsonPath("$.[*].contractNumber").value(hasItem(DEFAULT_CONTRACT_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].contractDate").value(hasItem(DEFAULT_CONTRACT_DATE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].finishDate").value(hasItem(DEFAULT_FINISH_DATE.toString())));
    }
    

    @Test
    @Transactional
    public void getTransportContract() throws Exception {
        // Initialize the database
        transportContractRepository.saveAndFlush(transportContract);

        // Get the transportContract
        restTransportContractMockMvc.perform(get("/api/transport-contracts/{id}", transportContract.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transportContract.getId().intValue()))
            .andExpect(jsonPath("$.contractCode").value(DEFAULT_CONTRACT_CODE.toString()))
            .andExpect(jsonPath("$.contractNumber").value(DEFAULT_CONTRACT_NUMBER.intValue()))
            .andExpect(jsonPath("$.contractDate").value(DEFAULT_CONTRACT_DATE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.finishDate").value(DEFAULT_FINISH_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTransportContract() throws Exception {
        // Get the transportContract
        restTransportContractMockMvc.perform(get("/api/transport-contracts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransportContract() throws Exception {
        // Initialize the database
        transportContractRepository.saveAndFlush(transportContract);

        int databaseSizeBeforeUpdate = transportContractRepository.findAll().size();

        // Update the transportContract
        TransportContract updatedTransportContract = transportContractRepository.findById(transportContract.getId()).get();
        // Disconnect from session so that the updates on updatedTransportContract are not directly saved in db
        em.detach(updatedTransportContract);
        updatedTransportContract
            .contractCode(UPDATED_CONTRACT_CODE)
            .contractNumber(UPDATED_CONTRACT_NUMBER)
            .contractDate(UPDATED_CONTRACT_DATE)
            .startDate(UPDATED_START_DATE)
            .finishDate(UPDATED_FINISH_DATE);

        restTransportContractMockMvc.perform(put("/api/transport-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransportContract)))
            .andExpect(status().isOk());

        // Validate the TransportContract in the database
        List<TransportContract> transportContractList = transportContractRepository.findAll();
        assertThat(transportContractList).hasSize(databaseSizeBeforeUpdate);
        TransportContract testTransportContract = transportContractList.get(transportContractList.size() - 1);
        assertThat(testTransportContract.getContractCode()).isEqualTo(UPDATED_CONTRACT_CODE);
        assertThat(testTransportContract.getContractNumber()).isEqualTo(UPDATED_CONTRACT_NUMBER);
        assertThat(testTransportContract.getContractDate()).isEqualTo(UPDATED_CONTRACT_DATE);
        assertThat(testTransportContract.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testTransportContract.getFinishDate()).isEqualTo(UPDATED_FINISH_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransportContract() throws Exception {
        int databaseSizeBeforeUpdate = transportContractRepository.findAll().size();

        // Create the TransportContract

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransportContractMockMvc.perform(put("/api/transport-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportContract)))
            .andExpect(status().isBadRequest());

        // Validate the TransportContract in the database
        List<TransportContract> transportContractList = transportContractRepository.findAll();
        assertThat(transportContractList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransportContract() throws Exception {
        // Initialize the database
        transportContractRepository.saveAndFlush(transportContract);

        int databaseSizeBeforeDelete = transportContractRepository.findAll().size();

        // Get the transportContract
        restTransportContractMockMvc.perform(delete("/api/transport-contracts/{id}", transportContract.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransportContract> transportContractList = transportContractRepository.findAll();
        assertThat(transportContractList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportContract.class);
        TransportContract transportContract1 = new TransportContract();
        transportContract1.setId(1L);
        TransportContract transportContract2 = new TransportContract();
        transportContract2.setId(transportContract1.getId());
        assertThat(transportContract1).isEqualTo(transportContract2);
        transportContract2.setId(2L);
        assertThat(transportContract1).isNotEqualTo(transportContract2);
        transportContract1.setId(null);
        assertThat(transportContract1).isNotEqualTo(transportContract2);
    }
}
