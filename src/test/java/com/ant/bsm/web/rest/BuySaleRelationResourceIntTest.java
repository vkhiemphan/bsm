package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.BuySaleRelation;
import com.ant.bsm.repository.BuySaleRelationRepository;
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
 * Test class for the BuySaleRelationResource REST controller.
 *
 * @see BuySaleRelationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class BuySaleRelationResourceIntTest {

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    @Autowired
    private BuySaleRelationRepository buySaleRelationRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBuySaleRelationMockMvc;

    private BuySaleRelation buySaleRelation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BuySaleRelationResource buySaleRelationResource = new BuySaleRelationResource(buySaleRelationRepository);
        this.restBuySaleRelationMockMvc = MockMvcBuilders.standaloneSetup(buySaleRelationResource)
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
    public static BuySaleRelation createEntity(EntityManager em) {
        BuySaleRelation buySaleRelation = new BuySaleRelation()
            .amount(DEFAULT_AMOUNT);
        return buySaleRelation;
    }

    @Before
    public void initTest() {
        buySaleRelation = createEntity(em);
    }

    @Test
    @Transactional
    public void createBuySaleRelation() throws Exception {
        int databaseSizeBeforeCreate = buySaleRelationRepository.findAll().size();

        // Create the BuySaleRelation
        restBuySaleRelationMockMvc.perform(post("/api/buy-sale-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buySaleRelation)))
            .andExpect(status().isCreated());

        // Validate the BuySaleRelation in the database
        List<BuySaleRelation> buySaleRelationList = buySaleRelationRepository.findAll();
        assertThat(buySaleRelationList).hasSize(databaseSizeBeforeCreate + 1);
        BuySaleRelation testBuySaleRelation = buySaleRelationList.get(buySaleRelationList.size() - 1);
        assertThat(testBuySaleRelation.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createBuySaleRelationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = buySaleRelationRepository.findAll().size();

        // Create the BuySaleRelation with an existing ID
        buySaleRelation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBuySaleRelationMockMvc.perform(post("/api/buy-sale-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buySaleRelation)))
            .andExpect(status().isBadRequest());

        // Validate the BuySaleRelation in the database
        List<BuySaleRelation> buySaleRelationList = buySaleRelationRepository.findAll();
        assertThat(buySaleRelationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBuySaleRelations() throws Exception {
        // Initialize the database
        buySaleRelationRepository.saveAndFlush(buySaleRelation);

        // Get all the buySaleRelationList
        restBuySaleRelationMockMvc.perform(get("/api/buy-sale-relations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(buySaleRelation.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }
    

    @Test
    @Transactional
    public void getBuySaleRelation() throws Exception {
        // Initialize the database
        buySaleRelationRepository.saveAndFlush(buySaleRelation);

        // Get the buySaleRelation
        restBuySaleRelationMockMvc.perform(get("/api/buy-sale-relations/{id}", buySaleRelation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(buySaleRelation.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingBuySaleRelation() throws Exception {
        // Get the buySaleRelation
        restBuySaleRelationMockMvc.perform(get("/api/buy-sale-relations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBuySaleRelation() throws Exception {
        // Initialize the database
        buySaleRelationRepository.saveAndFlush(buySaleRelation);

        int databaseSizeBeforeUpdate = buySaleRelationRepository.findAll().size();

        // Update the buySaleRelation
        BuySaleRelation updatedBuySaleRelation = buySaleRelationRepository.findById(buySaleRelation.getId()).get();
        // Disconnect from session so that the updates on updatedBuySaleRelation are not directly saved in db
        em.detach(updatedBuySaleRelation);
        updatedBuySaleRelation
            .amount(UPDATED_AMOUNT);

        restBuySaleRelationMockMvc.perform(put("/api/buy-sale-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBuySaleRelation)))
            .andExpect(status().isOk());

        // Validate the BuySaleRelation in the database
        List<BuySaleRelation> buySaleRelationList = buySaleRelationRepository.findAll();
        assertThat(buySaleRelationList).hasSize(databaseSizeBeforeUpdate);
        BuySaleRelation testBuySaleRelation = buySaleRelationList.get(buySaleRelationList.size() - 1);
        assertThat(testBuySaleRelation.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingBuySaleRelation() throws Exception {
        int databaseSizeBeforeUpdate = buySaleRelationRepository.findAll().size();

        // Create the BuySaleRelation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBuySaleRelationMockMvc.perform(put("/api/buy-sale-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buySaleRelation)))
            .andExpect(status().isBadRequest());

        // Validate the BuySaleRelation in the database
        List<BuySaleRelation> buySaleRelationList = buySaleRelationRepository.findAll();
        assertThat(buySaleRelationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBuySaleRelation() throws Exception {
        // Initialize the database
        buySaleRelationRepository.saveAndFlush(buySaleRelation);

        int databaseSizeBeforeDelete = buySaleRelationRepository.findAll().size();

        // Get the buySaleRelation
        restBuySaleRelationMockMvc.perform(delete("/api/buy-sale-relations/{id}", buySaleRelation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BuySaleRelation> buySaleRelationList = buySaleRelationRepository.findAll();
        assertThat(buySaleRelationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BuySaleRelation.class);
        BuySaleRelation buySaleRelation1 = new BuySaleRelation();
        buySaleRelation1.setId(1L);
        BuySaleRelation buySaleRelation2 = new BuySaleRelation();
        buySaleRelation2.setId(buySaleRelation1.getId());
        assertThat(buySaleRelation1).isEqualTo(buySaleRelation2);
        buySaleRelation2.setId(2L);
        assertThat(buySaleRelation1).isNotEqualTo(buySaleRelation2);
        buySaleRelation1.setId(null);
        assertThat(buySaleRelation1).isNotEqualTo(buySaleRelation2);
    }
}
