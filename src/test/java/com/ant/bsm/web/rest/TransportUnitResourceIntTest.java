package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.TransportUnit;
import com.ant.bsm.repository.TransportUnitRepository;
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
 * Test class for the TransportUnitResource REST controller.
 *
 * @see TransportUnitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class TransportUnitResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_SIZE = "AAAAAAAAAA";
    private static final String UPDATED_SIZE = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private TransportUnitRepository transportUnitRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransportUnitMockMvc;

    private TransportUnit transportUnit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransportUnitResource transportUnitResource = new TransportUnitResource(transportUnitRepository);
        this.restTransportUnitMockMvc = MockMvcBuilders.standaloneSetup(transportUnitResource)
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
    public static TransportUnit createEntity(EntityManager em) {
        TransportUnit transportUnit = new TransportUnit()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE)
            .note(DEFAULT_NOTE)
            .phone(DEFAULT_PHONE)
            .address(DEFAULT_ADDRESS)
            .size(DEFAULT_SIZE)
            .type(DEFAULT_TYPE);
        return transportUnit;
    }

    @Before
    public void initTest() {
        transportUnit = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransportUnit() throws Exception {
        int databaseSizeBeforeCreate = transportUnitRepository.findAll().size();

        // Create the TransportUnit
        restTransportUnitMockMvc.perform(post("/api/transport-units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportUnit)))
            .andExpect(status().isCreated());

        // Validate the TransportUnit in the database
        List<TransportUnit> transportUnitList = transportUnitRepository.findAll();
        assertThat(transportUnitList).hasSize(databaseSizeBeforeCreate + 1);
        TransportUnit testTransportUnit = transportUnitList.get(transportUnitList.size() - 1);
        assertThat(testTransportUnit.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTransportUnit.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testTransportUnit.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testTransportUnit.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testTransportUnit.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testTransportUnit.getSize()).isEqualTo(DEFAULT_SIZE);
        assertThat(testTransportUnit.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createTransportUnitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportUnitRepository.findAll().size();

        // Create the TransportUnit with an existing ID
        transportUnit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportUnitMockMvc.perform(post("/api/transport-units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportUnit)))
            .andExpect(status().isBadRequest());

        // Validate the TransportUnit in the database
        List<TransportUnit> transportUnitList = transportUnitRepository.findAll();
        assertThat(transportUnitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransportUnits() throws Exception {
        // Initialize the database
        transportUnitRepository.saveAndFlush(transportUnit);

        // Get all the transportUnitList
        restTransportUnitMockMvc.perform(get("/api/transport-units?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportUnit.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].size").value(hasItem(DEFAULT_SIZE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    

    @Test
    @Transactional
    public void getTransportUnit() throws Exception {
        // Initialize the database
        transportUnitRepository.saveAndFlush(transportUnit);

        // Get the transportUnit
        restTransportUnitMockMvc.perform(get("/api/transport-units/{id}", transportUnit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transportUnit.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.size").value(DEFAULT_SIZE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTransportUnit() throws Exception {
        // Get the transportUnit
        restTransportUnitMockMvc.perform(get("/api/transport-units/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransportUnit() throws Exception {
        // Initialize the database
        transportUnitRepository.saveAndFlush(transportUnit);

        int databaseSizeBeforeUpdate = transportUnitRepository.findAll().size();

        // Update the transportUnit
        TransportUnit updatedTransportUnit = transportUnitRepository.findById(transportUnit.getId()).get();
        // Disconnect from session so that the updates on updatedTransportUnit are not directly saved in db
        em.detach(updatedTransportUnit);
        updatedTransportUnit
            .name(UPDATED_NAME)
            .code(UPDATED_CODE)
            .note(UPDATED_NOTE)
            .phone(UPDATED_PHONE)
            .address(UPDATED_ADDRESS)
            .size(UPDATED_SIZE)
            .type(UPDATED_TYPE);

        restTransportUnitMockMvc.perform(put("/api/transport-units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransportUnit)))
            .andExpect(status().isOk());

        // Validate the TransportUnit in the database
        List<TransportUnit> transportUnitList = transportUnitRepository.findAll();
        assertThat(transportUnitList).hasSize(databaseSizeBeforeUpdate);
        TransportUnit testTransportUnit = transportUnitList.get(transportUnitList.size() - 1);
        assertThat(testTransportUnit.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTransportUnit.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testTransportUnit.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testTransportUnit.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testTransportUnit.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testTransportUnit.getSize()).isEqualTo(UPDATED_SIZE);
        assertThat(testTransportUnit.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransportUnit() throws Exception {
        int databaseSizeBeforeUpdate = transportUnitRepository.findAll().size();

        // Create the TransportUnit

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransportUnitMockMvc.perform(put("/api/transport-units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportUnit)))
            .andExpect(status().isBadRequest());

        // Validate the TransportUnit in the database
        List<TransportUnit> transportUnitList = transportUnitRepository.findAll();
        assertThat(transportUnitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransportUnit() throws Exception {
        // Initialize the database
        transportUnitRepository.saveAndFlush(transportUnit);

        int databaseSizeBeforeDelete = transportUnitRepository.findAll().size();

        // Get the transportUnit
        restTransportUnitMockMvc.perform(delete("/api/transport-units/{id}", transportUnit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransportUnit> transportUnitList = transportUnitRepository.findAll();
        assertThat(transportUnitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportUnit.class);
        TransportUnit transportUnit1 = new TransportUnit();
        transportUnit1.setId(1L);
        TransportUnit transportUnit2 = new TransportUnit();
        transportUnit2.setId(transportUnit1.getId());
        assertThat(transportUnit1).isEqualTo(transportUnit2);
        transportUnit2.setId(2L);
        assertThat(transportUnit1).isNotEqualTo(transportUnit2);
        transportUnit1.setId(null);
        assertThat(transportUnit1).isNotEqualTo(transportUnit2);
    }
}
