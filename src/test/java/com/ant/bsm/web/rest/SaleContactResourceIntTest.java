package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.SaleContact;
import com.ant.bsm.repository.SaleContactRepository;
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
 * Test class for the SaleContactResource REST controller.
 *
 * @see SaleContactResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class SaleContactResourceIntTest {

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
    private SaleContactRepository saleContactRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSaleContactMockMvc;

    private SaleContact saleContact;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SaleContactResource saleContactResource = new SaleContactResource(saleContactRepository);
        this.restSaleContactMockMvc = MockMvcBuilders.standaloneSetup(saleContactResource)
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
    public static SaleContact createEntity(EntityManager em) {
        SaleContact saleContact = new SaleContact()
            .saleContactCode(DEFAULT_SALE_CONTACT_CODE)
            .number(DEFAULT_NUMBER)
            .amount(DEFAULT_AMOUNT)
            .price(DEFAULT_PRICE)
            .contactDate(DEFAULT_CONTACT_DATE)
            .note(DEFAULT_NOTE)
            .status(DEFAULT_STATUS);
        return saleContact;
    }

    @Before
    public void initTest() {
        saleContact = createEntity(em);
    }

    @Test
    @Transactional
    public void createSaleContact() throws Exception {
        int databaseSizeBeforeCreate = saleContactRepository.findAll().size();

        // Create the SaleContact
        restSaleContactMockMvc.perform(post("/api/sale-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(saleContact)))
            .andExpect(status().isCreated());

        // Validate the SaleContact in the database
        List<SaleContact> saleContactList = saleContactRepository.findAll();
        assertThat(saleContactList).hasSize(databaseSizeBeforeCreate + 1);
        SaleContact testSaleContact = saleContactList.get(saleContactList.size() - 1);
        assertThat(testSaleContact.getSaleContactCode()).isEqualTo(DEFAULT_SALE_CONTACT_CODE);
        assertThat(testSaleContact.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testSaleContact.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testSaleContact.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testSaleContact.getContactDate()).isEqualTo(DEFAULT_CONTACT_DATE);
        assertThat(testSaleContact.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testSaleContact.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createSaleContactWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = saleContactRepository.findAll().size();

        // Create the SaleContact with an existing ID
        saleContact.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSaleContactMockMvc.perform(post("/api/sale-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(saleContact)))
            .andExpect(status().isBadRequest());

        // Validate the SaleContact in the database
        List<SaleContact> saleContactList = saleContactRepository.findAll();
        assertThat(saleContactList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSaleContacts() throws Exception {
        // Initialize the database
        saleContactRepository.saveAndFlush(saleContact);

        // Get all the saleContactList
        restSaleContactMockMvc.perform(get("/api/sale-contacts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(saleContact.getId().intValue())))
            .andExpect(jsonPath("$.[*].saleContactCode").value(hasItem(DEFAULT_SALE_CONTACT_CODE.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.toString())))
            .andExpect(jsonPath("$.[*].contactDate").value(hasItem(DEFAULT_CONTACT_DATE.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    

    @Test
    @Transactional
    public void getSaleContact() throws Exception {
        // Initialize the database
        saleContactRepository.saveAndFlush(saleContact);

        // Get the saleContact
        restSaleContactMockMvc.perform(get("/api/sale-contacts/{id}", saleContact.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(saleContact.getId().intValue()))
            .andExpect(jsonPath("$.saleContactCode").value(DEFAULT_SALE_CONTACT_CODE.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.toString()))
            .andExpect(jsonPath("$.contactDate").value(DEFAULT_CONTACT_DATE.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSaleContact() throws Exception {
        // Get the saleContact
        restSaleContactMockMvc.perform(get("/api/sale-contacts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSaleContact() throws Exception {
        // Initialize the database
        saleContactRepository.saveAndFlush(saleContact);

        int databaseSizeBeforeUpdate = saleContactRepository.findAll().size();

        // Update the saleContact
        SaleContact updatedSaleContact = saleContactRepository.findById(saleContact.getId()).get();
        // Disconnect from session so that the updates on updatedSaleContact are not directly saved in db
        em.detach(updatedSaleContact);
        updatedSaleContact
            .saleContactCode(UPDATED_SALE_CONTACT_CODE)
            .number(UPDATED_NUMBER)
            .amount(UPDATED_AMOUNT)
            .price(UPDATED_PRICE)
            .contactDate(UPDATED_CONTACT_DATE)
            .note(UPDATED_NOTE)
            .status(UPDATED_STATUS);

        restSaleContactMockMvc.perform(put("/api/sale-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSaleContact)))
            .andExpect(status().isOk());

        // Validate the SaleContact in the database
        List<SaleContact> saleContactList = saleContactRepository.findAll();
        assertThat(saleContactList).hasSize(databaseSizeBeforeUpdate);
        SaleContact testSaleContact = saleContactList.get(saleContactList.size() - 1);
        assertThat(testSaleContact.getSaleContactCode()).isEqualTo(UPDATED_SALE_CONTACT_CODE);
        assertThat(testSaleContact.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testSaleContact.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testSaleContact.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testSaleContact.getContactDate()).isEqualTo(UPDATED_CONTACT_DATE);
        assertThat(testSaleContact.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testSaleContact.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingSaleContact() throws Exception {
        int databaseSizeBeforeUpdate = saleContactRepository.findAll().size();

        // Create the SaleContact

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSaleContactMockMvc.perform(put("/api/sale-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(saleContact)))
            .andExpect(status().isBadRequest());

        // Validate the SaleContact in the database
        List<SaleContact> saleContactList = saleContactRepository.findAll();
        assertThat(saleContactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSaleContact() throws Exception {
        // Initialize the database
        saleContactRepository.saveAndFlush(saleContact);

        int databaseSizeBeforeDelete = saleContactRepository.findAll().size();

        // Get the saleContact
        restSaleContactMockMvc.perform(delete("/api/sale-contacts/{id}", saleContact.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SaleContact> saleContactList = saleContactRepository.findAll();
        assertThat(saleContactList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SaleContact.class);
        SaleContact saleContact1 = new SaleContact();
        saleContact1.setId(1L);
        SaleContact saleContact2 = new SaleContact();
        saleContact2.setId(saleContact1.getId());
        assertThat(saleContact1).isEqualTo(saleContact2);
        saleContact2.setId(2L);
        assertThat(saleContact1).isNotEqualTo(saleContact2);
        saleContact1.setId(null);
        assertThat(saleContact1).isNotEqualTo(saleContact2);
    }
}
