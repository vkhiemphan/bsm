package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.TransportHistory;
import com.ant.bsm.repository.TransportHistoryRepository;
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
 * Test class for the TransportHistoryResource REST controller.
 *
 * @see TransportHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class TransportHistoryResourceIntTest {

    private static final LocalDate DEFAULT_TRANSPORT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TRANSPORT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_TRANSPORT_TIME = 1L;
    private static final Long UPDATED_TRANSPORT_TIME = 2L;

    private static final Long DEFAULT_AMOUNT_PER_ONE = 1L;
    private static final Long UPDATED_AMOUNT_PER_ONE = 2L;

    @Autowired
    private TransportHistoryRepository transportHistoryRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransportHistoryMockMvc;

    private TransportHistory transportHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransportHistoryResource transportHistoryResource = new TransportHistoryResource(transportHistoryRepository);
        this.restTransportHistoryMockMvc = MockMvcBuilders.standaloneSetup(transportHistoryResource)
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
    public static TransportHistory createEntity(EntityManager em) {
        TransportHistory transportHistory = new TransportHistory()
            .transportDate(DEFAULT_TRANSPORT_DATE)
            .transportTime(DEFAULT_TRANSPORT_TIME)
            .amountPerOne(DEFAULT_AMOUNT_PER_ONE);
        return transportHistory;
    }

    @Before
    public void initTest() {
        transportHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransportHistory() throws Exception {
        int databaseSizeBeforeCreate = transportHistoryRepository.findAll().size();

        // Create the TransportHistory
        restTransportHistoryMockMvc.perform(post("/api/transport-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportHistory)))
            .andExpect(status().isCreated());

        // Validate the TransportHistory in the database
        List<TransportHistory> transportHistoryList = transportHistoryRepository.findAll();
        assertThat(transportHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        TransportHistory testTransportHistory = transportHistoryList.get(transportHistoryList.size() - 1);
        assertThat(testTransportHistory.getTransportDate()).isEqualTo(DEFAULT_TRANSPORT_DATE);
        assertThat(testTransportHistory.getTransportTime()).isEqualTo(DEFAULT_TRANSPORT_TIME);
        assertThat(testTransportHistory.getAmountPerOne()).isEqualTo(DEFAULT_AMOUNT_PER_ONE);
    }

    @Test
    @Transactional
    public void createTransportHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportHistoryRepository.findAll().size();

        // Create the TransportHistory with an existing ID
        transportHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportHistoryMockMvc.perform(post("/api/transport-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportHistory)))
            .andExpect(status().isBadRequest());

        // Validate the TransportHistory in the database
        List<TransportHistory> transportHistoryList = transportHistoryRepository.findAll();
        assertThat(transportHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransportHistories() throws Exception {
        // Initialize the database
        transportHistoryRepository.saveAndFlush(transportHistory);

        // Get all the transportHistoryList
        restTransportHistoryMockMvc.perform(get("/api/transport-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].transportDate").value(hasItem(DEFAULT_TRANSPORT_DATE.toString())))
            .andExpect(jsonPath("$.[*].transportTime").value(hasItem(DEFAULT_TRANSPORT_TIME.intValue())))
            .andExpect(jsonPath("$.[*].amountPerOne").value(hasItem(DEFAULT_AMOUNT_PER_ONE.intValue())));
    }
    

    @Test
    @Transactional
    public void getTransportHistory() throws Exception {
        // Initialize the database
        transportHistoryRepository.saveAndFlush(transportHistory);

        // Get the transportHistory
        restTransportHistoryMockMvc.perform(get("/api/transport-histories/{id}", transportHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transportHistory.getId().intValue()))
            .andExpect(jsonPath("$.transportDate").value(DEFAULT_TRANSPORT_DATE.toString()))
            .andExpect(jsonPath("$.transportTime").value(DEFAULT_TRANSPORT_TIME.intValue()))
            .andExpect(jsonPath("$.amountPerOne").value(DEFAULT_AMOUNT_PER_ONE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTransportHistory() throws Exception {
        // Get the transportHistory
        restTransportHistoryMockMvc.perform(get("/api/transport-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransportHistory() throws Exception {
        // Initialize the database
        transportHistoryRepository.saveAndFlush(transportHistory);

        int databaseSizeBeforeUpdate = transportHistoryRepository.findAll().size();

        // Update the transportHistory
        TransportHistory updatedTransportHistory = transportHistoryRepository.findById(transportHistory.getId()).get();
        // Disconnect from session so that the updates on updatedTransportHistory are not directly saved in db
        em.detach(updatedTransportHistory);
        updatedTransportHistory
            .transportDate(UPDATED_TRANSPORT_DATE)
            .transportTime(UPDATED_TRANSPORT_TIME)
            .amountPerOne(UPDATED_AMOUNT_PER_ONE);

        restTransportHistoryMockMvc.perform(put("/api/transport-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransportHistory)))
            .andExpect(status().isOk());

        // Validate the TransportHistory in the database
        List<TransportHistory> transportHistoryList = transportHistoryRepository.findAll();
        assertThat(transportHistoryList).hasSize(databaseSizeBeforeUpdate);
        TransportHistory testTransportHistory = transportHistoryList.get(transportHistoryList.size() - 1);
        assertThat(testTransportHistory.getTransportDate()).isEqualTo(UPDATED_TRANSPORT_DATE);
        assertThat(testTransportHistory.getTransportTime()).isEqualTo(UPDATED_TRANSPORT_TIME);
        assertThat(testTransportHistory.getAmountPerOne()).isEqualTo(UPDATED_AMOUNT_PER_ONE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransportHistory() throws Exception {
        int databaseSizeBeforeUpdate = transportHistoryRepository.findAll().size();

        // Create the TransportHistory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransportHistoryMockMvc.perform(put("/api/transport-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportHistory)))
            .andExpect(status().isBadRequest());

        // Validate the TransportHistory in the database
        List<TransportHistory> transportHistoryList = transportHistoryRepository.findAll();
        assertThat(transportHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransportHistory() throws Exception {
        // Initialize the database
        transportHistoryRepository.saveAndFlush(transportHistory);

        int databaseSizeBeforeDelete = transportHistoryRepository.findAll().size();

        // Get the transportHistory
        restTransportHistoryMockMvc.perform(delete("/api/transport-histories/{id}", transportHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransportHistory> transportHistoryList = transportHistoryRepository.findAll();
        assertThat(transportHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportHistory.class);
        TransportHistory transportHistory1 = new TransportHistory();
        transportHistory1.setId(1L);
        TransportHistory transportHistory2 = new TransportHistory();
        transportHistory2.setId(transportHistory1.getId());
        assertThat(transportHistory1).isEqualTo(transportHistory2);
        transportHistory2.setId(2L);
        assertThat(transportHistory1).isNotEqualTo(transportHistory2);
        transportHistory1.setId(null);
        assertThat(transportHistory1).isNotEqualTo(transportHistory2);
    }
}
