package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.TransportPlan;
import com.ant.bsm.repository.TransportPlanRepository;
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
 * Test class for the TransportPlanResource REST controller.
 *
 * @see TransportPlanResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class TransportPlanResourceIntTest {

    private static final LocalDate DEFAULT_TRANSPORT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TRANSPORT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_TRANSPORT_TIME = 1L;
    private static final Long UPDATED_TRANSPORT_TIME = 2L;

    private static final Long DEFAULT_AMOUNT_PER_ONE = 1L;
    private static final Long UPDATED_AMOUNT_PER_ONE = 2L;

    @Autowired
    private TransportPlanRepository transportPlanRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransportPlanMockMvc;

    private TransportPlan transportPlan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransportPlanResource transportPlanResource = new TransportPlanResource(transportPlanRepository);
        this.restTransportPlanMockMvc = MockMvcBuilders.standaloneSetup(transportPlanResource)
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
    public static TransportPlan createEntity(EntityManager em) {
        TransportPlan transportPlan = new TransportPlan()
            .transportDate(DEFAULT_TRANSPORT_DATE)
            .transportTime(DEFAULT_TRANSPORT_TIME)
            .amountPerOne(DEFAULT_AMOUNT_PER_ONE);
        return transportPlan;
    }

    @Before
    public void initTest() {
        transportPlan = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransportPlan() throws Exception {
        int databaseSizeBeforeCreate = transportPlanRepository.findAll().size();

        // Create the TransportPlan
        restTransportPlanMockMvc.perform(post("/api/transport-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportPlan)))
            .andExpect(status().isCreated());

        // Validate the TransportPlan in the database
        List<TransportPlan> transportPlanList = transportPlanRepository.findAll();
        assertThat(transportPlanList).hasSize(databaseSizeBeforeCreate + 1);
        TransportPlan testTransportPlan = transportPlanList.get(transportPlanList.size() - 1);
        assertThat(testTransportPlan.getTransportDate()).isEqualTo(DEFAULT_TRANSPORT_DATE);
        assertThat(testTransportPlan.getTransportTime()).isEqualTo(DEFAULT_TRANSPORT_TIME);
        assertThat(testTransportPlan.getAmountPerOne()).isEqualTo(DEFAULT_AMOUNT_PER_ONE);
    }

    @Test
    @Transactional
    public void createTransportPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportPlanRepository.findAll().size();

        // Create the TransportPlan with an existing ID
        transportPlan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportPlanMockMvc.perform(post("/api/transport-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportPlan)))
            .andExpect(status().isBadRequest());

        // Validate the TransportPlan in the database
        List<TransportPlan> transportPlanList = transportPlanRepository.findAll();
        assertThat(transportPlanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransportPlans() throws Exception {
        // Initialize the database
        transportPlanRepository.saveAndFlush(transportPlan);

        // Get all the transportPlanList
        restTransportPlanMockMvc.perform(get("/api/transport-plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportPlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].transportDate").value(hasItem(DEFAULT_TRANSPORT_DATE.toString())))
            .andExpect(jsonPath("$.[*].transportTime").value(hasItem(DEFAULT_TRANSPORT_TIME.intValue())))
            .andExpect(jsonPath("$.[*].amountPerOne").value(hasItem(DEFAULT_AMOUNT_PER_ONE.intValue())));
    }
    

    @Test
    @Transactional
    public void getTransportPlan() throws Exception {
        // Initialize the database
        transportPlanRepository.saveAndFlush(transportPlan);

        // Get the transportPlan
        restTransportPlanMockMvc.perform(get("/api/transport-plans/{id}", transportPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transportPlan.getId().intValue()))
            .andExpect(jsonPath("$.transportDate").value(DEFAULT_TRANSPORT_DATE.toString()))
            .andExpect(jsonPath("$.transportTime").value(DEFAULT_TRANSPORT_TIME.intValue()))
            .andExpect(jsonPath("$.amountPerOne").value(DEFAULT_AMOUNT_PER_ONE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTransportPlan() throws Exception {
        // Get the transportPlan
        restTransportPlanMockMvc.perform(get("/api/transport-plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransportPlan() throws Exception {
        // Initialize the database
        transportPlanRepository.saveAndFlush(transportPlan);

        int databaseSizeBeforeUpdate = transportPlanRepository.findAll().size();

        // Update the transportPlan
        TransportPlan updatedTransportPlan = transportPlanRepository.findById(transportPlan.getId()).get();
        // Disconnect from session so that the updates on updatedTransportPlan are not directly saved in db
        em.detach(updatedTransportPlan);
        updatedTransportPlan
            .transportDate(UPDATED_TRANSPORT_DATE)
            .transportTime(UPDATED_TRANSPORT_TIME)
            .amountPerOne(UPDATED_AMOUNT_PER_ONE);

        restTransportPlanMockMvc.perform(put("/api/transport-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransportPlan)))
            .andExpect(status().isOk());

        // Validate the TransportPlan in the database
        List<TransportPlan> transportPlanList = transportPlanRepository.findAll();
        assertThat(transportPlanList).hasSize(databaseSizeBeforeUpdate);
        TransportPlan testTransportPlan = transportPlanList.get(transportPlanList.size() - 1);
        assertThat(testTransportPlan.getTransportDate()).isEqualTo(UPDATED_TRANSPORT_DATE);
        assertThat(testTransportPlan.getTransportTime()).isEqualTo(UPDATED_TRANSPORT_TIME);
        assertThat(testTransportPlan.getAmountPerOne()).isEqualTo(UPDATED_AMOUNT_PER_ONE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransportPlan() throws Exception {
        int databaseSizeBeforeUpdate = transportPlanRepository.findAll().size();

        // Create the TransportPlan

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransportPlanMockMvc.perform(put("/api/transport-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportPlan)))
            .andExpect(status().isBadRequest());

        // Validate the TransportPlan in the database
        List<TransportPlan> transportPlanList = transportPlanRepository.findAll();
        assertThat(transportPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransportPlan() throws Exception {
        // Initialize the database
        transportPlanRepository.saveAndFlush(transportPlan);

        int databaseSizeBeforeDelete = transportPlanRepository.findAll().size();

        // Get the transportPlan
        restTransportPlanMockMvc.perform(delete("/api/transport-plans/{id}", transportPlan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransportPlan> transportPlanList = transportPlanRepository.findAll();
        assertThat(transportPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportPlan.class);
        TransportPlan transportPlan1 = new TransportPlan();
        transportPlan1.setId(1L);
        TransportPlan transportPlan2 = new TransportPlan();
        transportPlan2.setId(transportPlan1.getId());
        assertThat(transportPlan1).isEqualTo(transportPlan2);
        transportPlan2.setId(2L);
        assertThat(transportPlan1).isNotEqualTo(transportPlan2);
        transportPlan1.setId(null);
        assertThat(transportPlan1).isNotEqualTo(transportPlan2);
    }
}
