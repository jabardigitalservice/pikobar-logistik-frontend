<template>
  <div class="background-landing-page">
    <div class="full-landing-page">
      <div class="header-landing-page">
        <v-row align="center">
          <v-col cols="12" md="9" xs="12">
            <v-row>
              <img height="40" src="../../static/logistik_logo_lingkar.svg">
              <div class="title-page-landing-page">{{ $t('label.logistics_medical_device') }}</div>
            </v-row>
          </v-col>
          <v-col cols="12" md="3" xs="12" style="padding-top: 20px">
            <v-row class="float-right-landing-page">
              <a :href="$t('label.link_tutorial')" target="_blank"><div class="tutorial-class pusat-bantuan-landing-page landing-page-guide">{{ $t('label.tutorial') }} </div></a>
              <a :href="$t('label.link_tutorial')" target="_blank"><img height="25" src="../../static/icon_book-outline.png"></a>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <!-- Header mobile -->
      <div class="header-landing-page-mobile">
        <v-row>
          <v-col cols="10">
            <v-row>
              <v-col class="margin-left-20" cols="2">
                <img height="40" src="../../static/logistik_logo_lingkar.svg">
              </v-col>
              <v-col cols="10">
                <div class="title-page-landing-page-mobile margin-left-title-mobile-landing-page">
                  {{ $t('label.logistics_medical_device') }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row class="float-right-landing-page mobile-space-icon-help">
              <a :href="$t('label.link_tutorial')" target="_blank" class="margin-icon-help-mobile-landing-page"><img height="25" src="../../static/icon_book-outline.png"></a>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <!-- End header mobile -->
    </div>
    <div class="negative-landing-page">
      <v-card class="main-card-landing-page" outlined>
        <div class="back">
          <span>
            <a href="#/landing-page">
              <img class="back-image" width="15px" src="../../static/back_icon.png">
            </a>
            <span class="back-text">{{ $t('label.back') }}</span>
          </span>
        </div>
        <v-row>
          <v-col sm="12" md="7" class="left-side">
            <div class="title">
              <h3>{{ $t('label.tracking_logistic') }} <span class="logistic">{{ $t('label.logistic').toLowerCase() }}</span></h3>
            </div>
            <div class="body-text">
              <p>{{ $t('label.tracking_body') }}</p>
            </div>
            <div class="form">
              <v-form ref="form">
                <ValidationObserver ref="observer">
                  <v-label><b>{{ $t('label.tracking_search') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="requiredTrackingField"
                  >
                    <v-text-field
                      v-model="listQuery.search"
                      outlined
                      solo-inverted
                      :error-messages="errors"
                      :placeholder="$t('label.tracking_search_placeholder')"
                      @keyup.enter.native="getDataTracking(1)"
                    />
                  </ValidationProvider>
                  <div class="button-action">
                    <v-btn class="button-style" min-width="150px" outlined text @click="resetData">{{ $t('label.cancel') }}</v-btn>
                    <v-btn class="button-style" min-width="150px" color="success" @click="getDataTracking(1)">{{ $t('label.tracking_cek') }}</v-btn>
                  </div>
                </ValidationObserver>
              </v-form>
            </div>
          </v-col>
          <v-col sm="12" md="5">
            <img src="../../static/tracking_logistik_1.png" width="350px">
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="clicked && dataTracking.application.length > 0" class="main-card-landing-page card-data-tracking" outlined>
        <div class="result">
          <p>{{ $t('label.tracking_count_success') }} <b>{{ dataTracking.total }}</b> {{ $t('label.tracking_result') }}</p>
        </div>
        <v-row>
          <v-col>
            <v-tabs
              v-model="tab"
              background-color="#EEEEEE"
              color="#069550"
              height="60px"
            >
              <v-tab
                v-for="(item, index) in dataTracking.application"
                :key="index"
                @click="getTrackingLogisticNeedList(item.id)"
              >
                {{ $t('label.tracking_id') }}{{ item.id }}
              </v-tab>
              <v-tab-item
                v-for="(item, index) in dataTracking.application"
                :key="index"
              >
                <div class="identity text-data-green">
                  {{ $t('label.step_title_2') }}
                </div>
                <v-card
                  class="mx-auto"
                  outlined
                >
                  <v-row>
                    <v-col class="margin-20" cols="12" sm="6" md="6">
                      <v-row class="margin-top-min-15">
                        <v-col>
                          <span class="text-title-green">
                            {{ $t('label.instance_type') }}
                          </span>
                          <br>
                          <v-label>
                            {{ item.master_faskes_type.name }}
                          </v-label>
                        </v-col>
                        <v-col>
                          <span class="text-title-green">
                            {{ $t('label.contact_person') }}
                          </span>
                          <br>
                          <v-label>
                            {{ item.applicant.applicant_name }}
                          </v-label>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <span class="text-title-green">
                            {{ $t('label.instance_name') }}
                          </span>
                          <br>
                          <v-label>
                            {{ item.agency_name }}
                          </v-label>
                        </v-col>
                        <v-col>
                          <span class="text-title-green">
                            {{ $t('label.applicant_position_identity') }}
                          </span>
                          <br>
                          <v-label>
                            {{ item.applicant.applicants_office }}
                          </v-label>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col class="margin-20" cols="12" sm="4" md="4">
                      <span class="text-title-green">
                        {{ $t('label.full_address') }}
                      </span>
                      <br>
                      <v-label>
                        {{ item.location_address }}
                      </v-label>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row>
                  <v-col cols="12">
                    <v-stepper value="1" :alt-labels="true" :dark="true" :light="false">
                      <v-stepper-header v-if="!item.tracking.approval.is_reject && !item.tracking.verification.is_reject" class="tracking-status">
                        <v-row>
                          <v-col cols="12">
                            <div class="tracking-status-text">
                              <p><span>{{ $t('label.tracking_status') }}</span> <span>{{ item.tracking.status }}</span></p>
                            </div>
                          </v-col>
                        </v-row>
                        <v-stepper-step
                          :complete="item.tracking.request"
                          step=""
                          class="tracking-step tracking-step-first"
                        >
                          <div class="color-step">
                            <img src="../../static/iconChecklist.png">
                            <div class="step-name">{{ $t('label.tracking_step1') }}</div>
                          </div>
                        </v-stepper-step>
                        <v-divider class="tracking-divider" />
                        <v-stepper-step
                          :complete="item.tracking.verification.status"
                          step=""
                          class="tracking-step"
                        >
                          <span class="color-step">
                            <img src="../../static/iconBox.png">
                            <div class="step-name">{{ $t('label.tracking_step2') }}</div>
                          </span>
                        </v-stepper-step>
                        <v-divider class="tracking-divider" />
                        <v-stepper-step
                          :complete="item.tracking.approval.status"
                          step=""
                          class="tracking-step"
                        >
                          <span class="color-step">
                            <img src="../../static/iconContract.png">
                            <div class="step-name">{{ $t('label.tracking_step3') }}</div>
                          </span>
                        </v-stepper-step>
                      </v-stepper-header>
                      <v-stepper-header v-else class="tracking-status-reject">
                        <v-row>
                          <v-col cols="12">
                            <div class="tracking-status-text">
                              <p><span>{{ $t('label.tracking_status') }}</span> <b>{{ item.tracking.status }}</b></p>
                            </div>
                          </v-col>
                        </v-row>
                        <v-stepper-step
                          :complete="item.tracking.request"
                          step=""
                          class="tracking-step tracking-step-first"
                        >
                          <div class="color-step">
                            <img src="../../static/iconChecklist.png">
                            <div class="step-name">{{ $t('label.tracking_step1') }}</div>
                          </div>
                        </v-stepper-step>
                        <v-divider class="tracking-divider" />
                        <v-stepper-step
                          :complete="item.tracking.verification.status"
                          step=""
                          class="tracking-step"
                        >
                          <span class="color-step">
                            <img src="../../static/iconBox.png">
                            <div v-if="item.tracking.verification.is_reject" class="step-name">{{ item.tracking.status }}</div>
                            <div v-else class="step-name">{{ $t('label.tracking_step2') }}</div>
                          </span>
                        </v-stepper-step>
                        <v-divider class="tracking-divider" />
                        <v-stepper-step
                          :complete="item.tracking.approval.status"
                          step=""
                          class="tracking-step"
                        >
                          <span class="color-step">
                            <img src="../../static/iconContract.png">
                            <div v-if="item.tracking.approval.is_reject" class="step-name">{{ item.tracking.status }}</div>
                            <div v-else class="step-name">{{ $t('label.tracking_step3') }}</div>
                          </span>
                        </v-stepper-step>
                      </v-stepper-header>
                    </v-stepper>
                    <v-card v-if="item.tracking.verification.is_reject || item.tracking.approval.is_reject" class="tracking-status-reject tracking-reject-reason">
                      <div class="tracking-status-reject-note">
                        <p class="reject-reason-title">{{ $t('label.tracking_reason_reject') }}</p>
                        <p class="reject-reason-data">{{ item.tracking.reject_note }}</p>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
        <div class="identity text-data-green">
          {{ $t('label.list_logistic_need') }}
        </div>
        <v-row>
          <v-col>
            <v-card outlined>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th colspan="6" class="text-center green lighten-5">{{ $t('label.request').toUpperCase() }}</th>
                      <th colspan="4" class="text-center green lighten-4">{{ $t('label.recommendation').toUpperCase() }}</th>
                      <th colspan="4" class="text-center green lighten-3">{{ $t('label.realization').toUpperCase() }}</th>
                    </tr>
                    <tr>
                      <th class="text-left green lighten-5">{{ $t('label.number').toUpperCase() }}</th>
                      <th class="text-left green lighten-5">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                      <th class="text-left green lighten-5">{{ $t('label.description').toUpperCase() }}</th>
                      <th class="text-left green lighten-5">{{ $t('label.total').toUpperCase() }}</th>
                      <th class="text-left green lighten-5">{{ $t('label.unit').toUpperCase() }}</th>
                      <th class="text-left green lighten-5">{{ $t('label.item_type').toUpperCase() }}</th>
                      <th class="text-left green lighten-4">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                      <th class="text-left green lighten-4">{{ $t('label.total').toUpperCase() }}</th>
                      <th class="text-left green lighten-4">{{ $t('label.unit').toUpperCase() }}</th>
                      <th class="text-left green lighten-4">{{ $t('label.status').toUpperCase() }}</th>
                      <th class="text-left green lighten-3">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                      <th class="text-left green lighten-3">{{ $t('label.total').toUpperCase() }}</th>
                      <th class="text-left green lighten-3">{{ $t('label.unit').toUpperCase() }}</th>
                      <th class="text-left green lighten-3">{{ $t('label.status').toUpperCase() }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="listLogisticRequest.length === 0">
                      <td class="text-center" :colspan="12">{{ $t('label.no_data') }}</td>
                    </tr>
                    <tr v-for="(item, index) in listLogisticRequest" v-else :key="item.index">
                      <td>{{ getTableRowNumbering(index) }}</td>
                      <td>{{ item.need_product_name || '-' }}</td>
                      <td>{{ item.need_description || '-' }}</td>
                      <td>{{ item.need_quantity || '-' }}</td>
                      <td>{{ item.need_unit_name || '-' }}</td>
                      <td>{{ item.category || '-' }}</td>
                      <!-- recommendation -->
                      <td>{{ item.recommendation_product_name || '-' }}</td>
                      <td>{{ item.recommendation_quantity || '-' }}</td>
                      <td>{{ item.recommendation_unit_name || '-' }}</td>
                      <td>{{ changeStatus(item.recommendation_status) || '-' }}</td>
                      <!-- realization -->
                      <td>{{ item.final_product_name || '-' }}</td>
                      <td>{{ item.final_quantity || '-' }}</td>
                      <td>{{ item.final_unit || '-' }}</td>
                      <td>{{ changeStatus(item.final_status) || '-' }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <br>
            </v-card>
            <v-row>
              <v-col>
                <div class="total-data-title">{{ $t('label.tracking_total_data_logistic') }} <span class="total-data">{{ totalDataLogisticRequest }} {{ $t('label.tracking_data_prefix') }}</span> </div>
              </v-col>
              <v-col>
                <div class="pagination">
                  <v-pagination
                    v-model="listQueryTable.page"
                    :length="totalListLogisticRequest"
                    :page.sync="listQueryTable.page"
                    :total-visible="20"
                    @input="onNext"
                  />
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-else-if="clicked && dataTracking.application.length === 0" class="main-card-landing-page card-data-tracking" outlined>
        <center>
          <img src="../../static/tracking_not_found.png" width="350px">
          <div class="not-found-title">{{ $t('label.tracking_not_found_title') }}</div>
          <div class="not-found-text">{{ $t('label.tracking_not_found_text') }}</div>
        </center>
      </v-card>
      <div class="text-card-main">
        <v-row style="margin-top: -20px">
          <v-col cols="6" md="6">
            <img class="landing-page-logo-jds" src="../../static/jds-logo.png">
          </v-col>
          <v-col cols="6" md="6">
            <div class="copyright">
              <p>
                <span>{{ $t('label.copyright') }}</span>
                <span> &copy; </span>
                <span>{{ $t('label.year') }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
      <!-- Mobile Footer -->
      <div class="text-card-main-mobile">
        <v-row>
          <v-col>
            <img class="footer-logo-mobile" src="../../static/jds-logo.png">
            <div class="copyright-mobile">
              <p>
                <span>{{ $t('label.copyright') }}</span>
                <span> &copy; </span>
                <span>{{ $t('label.year') }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'LandingPage',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      id: null,
      tab: null,
      clicked: false,
      listQuery: {
        search: null
      },
      listQueryTable: {
        page: 1,
        limit: 3
      }
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'dataTracking',
      'listLogisticRequest',
      'totalListLogisticRequest',
      'totalDataLogisticRequest'
    ])
  },
  methods: {
    async getDataTracking(page) {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }

      this.listQueryTable.page = page ?? this.listQueryTable.page
      await this.$store.dispatch('logistics/getTrackingLogistic', this.listQuery)
      if (this.dataTracking.application.length > 0) this.getTrackingLogisticNeedList(this.dataTracking.application[0].id)
      this.clicked = true
    },
    async getTrackingLogisticNeedList(id) {
      this.id = id
      this.listQueryTable.id = id
      await this.$store.dispatch('logistics/getTrackingLogisticNeedList', this.listQueryTable)
    },
    changeStatus(value) {
      switch (value) {
        case 'approved':
          return this.$t('label.approved')
        case 'not_delivered':
          return this.$t('label.not_delivered')
        case 'delivered':
          return this.$t('label.delivered')
        case 'not_available':
          return this.$t('label.not_available')
        case 'replaced':
          return this.$t('label.replaced')
        default:
          return this.$t('label.not_approved')
      }
    },
    async onNext() {
      await this.getTrackingLogisticNeedList(this.id)
    },
    getTableRowNumbering(index) {
      return ((parseInt(this.listQueryTable.page) - 1) * parseInt(this.listQueryTable.limit)) + (parseInt(index) + 1)
    },
    async resetData() {
      this.$refs.form.reset()
      this.clicked = false
    }
  }
}
</script>
<style lang="scss" scoped>
 .main-card-landing-page {
   padding: 50px;
 }
 .left-side {
   padding-right: 100px;
 }
 .button-style {
   margin-right: 20px;
 }
 .back {
   margin-bottom: 30px;
 }
 .back-text {
   margin-left: 30px;
   margin-bottom: 40px;
   font-family: Lato;
   font-size: 16px;
 }
 .body-text {
   font-family: Lato;
   font-size: 16px;
   line-height: 26px;
 }
 .card-data-tracking {
   margin-top: -30px;
 }
 .result {
   p {
     font-family: Lato;
     font-size: 16px;
   }
 }
 .identity {
   margin: 20px 0;
 }
 .text-data-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 17px;
  color: #219653;
}
.text-title-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #219653;
}
 .title {
   h3 {
    font-family: Lora;
    font-size: 32px;
    font-weight: bold;
    line-height: 45px;

    .logistic {
      color: #16A75C
    }
   }
 }
 .color-step {
   color: white;
 }
 .tracking-status {
   background: #16A75C;
 }
 .tracking-status-reject {
   background: #EF5350;
 }
 .tracking-status-text {
   color: white;
   margin: 20px;
   width: 500px;
   padding-left: 35px;
   padding-bottom: 20px;
 }
 .tracking-status-reject-note {
    color: white;
    margin: 20px;
    padding-left: 5rem;
    padding-left: 2rem;
 }
 .tracking-step-first {
   margin-left: -60rem;
 }
 .tracking-step {
   color: white;
   padding-top: 80px
 }
 .tracking-divider {
   background: white;
   margin-top: 90px !important;
 }
 .tracking-step-error {
   color: #D50000 !important;
 }
 .step-name {
   text-align: left;
   margin-left: 35px;
   margin-top: -30px;
 }
 .not-found-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 34px;
    color: #020814;
 }
 .not-found-text {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    color: #414D5C;
 }
 .total-data-title {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
    color: #757575;
 }
 .total-data {
    font-weight: bold;
    color: #4F4F4F;
 }
 .pagination {
    display: block;
    float: right !important;
 }
 .reject-reason-title {
   font-size: 16px;
   line-height: 26px;
 }
 .reject-reason-data {
   font-size: 14px;
   line-height: 26px;
   margin-top: -1rem;
 }
 .tracking-reject-reason {
   margin-top: .5rem;
 }

</style>
