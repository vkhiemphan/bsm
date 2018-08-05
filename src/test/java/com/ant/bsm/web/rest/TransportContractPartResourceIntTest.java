package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.TransportContractPart;
import com.ant.bsm.repository.TransportContractPartRepository;
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
import java.util.List;


import static com.ant.bsm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TransportContractPartResource REST controller.
 *
 * @see TransportContractPartResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class TransportContractPartResourceIntTest {

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;

    private static final Long DEFAULT_SIZE = 1L;
    private static final Long UPDATED_SIZE = 2L;

    private static final Long DEFAULT_DISTANCE = 1L;
    private static final Long UPDATED_DISTANCE = 2L;

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final Long DEFAULT_CURRENT_AMOUNT = 1L;
    private static final Long UPDATED_CURRENT_AMOUNT = 2L;

    @Autowired
    private TransportContractPartRepository transportContractPartRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransportContractPartMockMvc;

    private TransportContractPart transportContractPart;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransportContractPartResource transportContractPartResource = new TransportContractPartResource(transportContractPartRepository);
        this.restTransportContractPartMockMvc = MockMvcBuilders.standaloneSetup(transportContractPartResource)
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
    public static TransportContractPart createEntity(EntityManager em) {
        TransportContractPart transportContractPart = new TransportContractPart()
            .price(DEFAULT_PRICE)
            .size(DEFAULT_SIZE)
            .distance(DEFAULT_DISTANCE)
            .amount(DEFAULT_AMOUNT)
            .currentAmount(DEFAULT_CURRENT_AMOUNT);
        return transportContractPart;
    }

    @Before
    public void initTest() {
        transportContractPart = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransportContractPart() throws Exception {
        int databaseSizeBeforeCreate = transportContractPartRepository.findAll().size();

        // Create the TransportContractPart
        restTransportContractPartMockMvc.perform(post("/api/transport-contract-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportContractPart)))
            .andExpect(status().isCreated());

        // Validate the TransportContractPart in the database
        List<TransportContractPart> transportContractPartList = transportContractPartRepository.findAll();
        assertThat(transportContractPartList).hasSize(databaseSizeBeforeCreate + 1);
        TransportContractPart testTransportContractPart = transportContractPartList.get(transportContractPartList.size() - 1);
        assertThat(testTransportContractPart.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testTransportContractPart.getSize()).isEqualTo(DEFAULT_SIZE);
        assertThat(testTransportContractPart.getDistance()).isEqualTo(DEFAULT_DISTANCE);
        assertThat(testTransportContractPart.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testTransportContractPart.getCurrentAmount()).isEqualTo(DEFAULT_CURRENT_AMOUNT);
    }

    @Test
    @Transactional
    public void createTransportContractPartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportContractPartRepository.findAll().size();

        // Create the TransportContractPart with an existing ID
        transportContractPart.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportContractPartMockMvc.perform(post("/api/transport-contract-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportContractPart)))
            .andExpect(status().isBadRequest());

        // Validate the TransportContractPart in the database
        List<TransportContractPart> transportContractPartList = transportContractPartRepository.findAll();
        assertThat(transportContractPartList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransportContractParts() throws Exception {
        // Initialize the database
        transportContractPartRepository.saveAndFlush(transportContractPart);

        // Get all the transportContractPartList
        restTransportContractPartMockMvc.perform(get("/api/transport-contract-parts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportContractPart.getId().intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].size").value(hasItem(DEFAULT_SIZE.intValue())))
            .andExpect(jsonPath("$.[*].distance").value(hasItem(DEFAULT_DISTANCE.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].currentAmount").value(hasItem(DEFAULT_CURRENT_AMOUNT.intValue())));
    }
    

    @Test
    @Transactional
    public void getTransportContractPart() throws Exception {
        // Initialize the database
        transportContractPartRepository.saveAndFlush(transportContractPart);

        // Get the transportContractPart
        restTransportContractPartMockMvc.perform(get("/api/transport-contract-parts/{id}", transportContractPart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transportContractPart.getId().intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.size").value(DEFAULT_SIZE.intValue()))
            .andExpect(jsonPath("$.distance").value(DEFAULT_DISTANCE.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.currentAmount").value(DEFAULT_CURRENT_AMOUNT.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTransportContractPart() throws Exception {
        // Get the transportContractPart
        restTransportContractPartMockMvc.perform(get("/api/transport-contract-parts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransportContractPart() throws Exception {
        // Initialize the database
        transportContractPartRepository.saveAndFlush(transportContractPart);

        int databaseSizeBeforeUpdate = transportContractPartRepository.findAll().size();

        // Update the transportContractPart
        TransportContractPart updatedTransportContractPart = transportContractPartRepository.findById(transportContractPart.getId()).get();
        // Disconnect from session so that the updates on updatedTransportContractPart are not directly saved in db
        em.detach(updatedTransportContractPart);
        updatedTransportContractPart
            .price(UPDATED_PRICE)
            .size(UPDATED_SIZE)
            .distance(UPDATED_DISTANCE)
            .amount(UPDATED_AMOUNT)
            .currentAmount(UPDATED_CURRENT_AMOUNT);

        restTransportContractPartMockMvc.perform(put("/api/transport-contract-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransportContractPart)))
            .andExpect(status().isOk());

        // Validate the TransportContractPart in the database
        List<TransportContractPart> transportContractPartList = transportContractPartRepository.findAll();
        assertThat(transportContractPartList).hasSize(databaseSizeBeforeUpdate);
        TransportContractPart testTransportContractPart = transportContractPartList.get(transportContractPartList.size() - 1);
        assertThat(testTransportContractPart.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testTransportContractPart.getSize()).isEqualTo(UPDATED_SIZE);
        assertThat(testTransportContractPart.getDistance()).isEqualTo(UPDATED_DISTANCE);
        assertThat(testTransportContractPart.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testTransportContractPart.getCurrentAmount()).isEqualTo(UPDATED_CURRENT_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingTransportContractPart() throws Exception {
        int databaseSizeBeforeUpdate = transportContractPartRepository.findAll().size();

        // Create the TransportContractPart

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransportContractPartMockMvc.perform(put("/api/transport-contract-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportContractPart)))
            .andExpect(status().isBadRequest());

        // Validate the TransportContractPart in the database
        List<TransportContractPart> transportContractPartList = transportContractPartRepository.findAll();
        assertThat(transportContractPartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransportContractPart() throws Exception {
        // Initialize the database
        transportContractPartRepository.saveAndFlush(transportContractPart);

        int databaseSizeBeforeDelete = transportContractPartRepository.findAll().size();

        // Get the transportContractPart
        restTransportContractPartMockMvc.perform(delete("/api/transport-contract-parts/{id}", transportContractPart.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransportContractPart> transportContractPartList = transportContractPartRepository.findAll();
        assertThat(transportContractPartList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportContractPart.class);
        TransportContractPart transportContractPart1 = new TransportContractPart();
        transportContractPart1.setId(1L);
        TransportContractPart transportContractPart2 = new TransportContractPart();
        transportContractPart2.setId(transportContractPart1.getId());
        assertThat(transportContractPart1).isEqualTo(transportContractPart2);
        transportContractPart2.setId(2L);
        assertThat(transportContractPart1).isNotEqualTo(transportContractPart2);
        transportContractPart1.setId(null);
        assertThat(transportContractPart1).isNotEqualTo(transportContractPart2);
    }
}
